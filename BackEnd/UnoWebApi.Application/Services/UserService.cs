using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using UnoWebApi.Application.Helpers;
using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Domain.Models;
using UnoWebApi.Infrastructure.Context.Interfaces;

namespace UnoWebApi.Application.Services {
    public class UserService: IUserService {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IUnoDbContext _context;
        public UserService(UserManager<ApplicationUser> userManager,
                           RoleManager<IdentityRole<Guid>> roleManager,
                           IConfiguration configuration,
                           IUnoDbContext dbContext) {

            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = dbContext;
        }

        /// <summary>
        /// Service to get all the users in the system from controller  "GetAllUsers"
        /// </summary>
        public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync() {

            List<ApplicationUser> users = await _userManager.Users.ToListAsync();
            return users;
        }

        /// <summary>
        /// Service to get a user by its id from controller  "GetUserById"
        /// </summary>
        public async Task<ApplicationUser?> GetUserByIdAsync(Guid id) {

            if(id == Guid.Empty) {
                throw new ArgumentNullException(nameof(id));
            }
            ApplicationUser? user = await _userManager.FindByIdAsync(id.ToString());
            return user ?? null;
        }

        /// <summary>
        /// Service to list users from controller  "ListUsers"
        /// </summary>
        /// <param name="searchQuery">The term to search users</param>
        /// <param name="orderBy">Order by Name or Email; default order by Name</param>
        /// <param name="direction">Order Ascending or Descending; Default order Ascending</param>
        /// <returns>A list of users ordered</returns>
        public async Task<IEnumerable<ApplicationUser?>?> ListUsersAsync(string searchQuery, string orderBy, int direction) {

            string normalizedString = GenericHelper.RemoveDiacritics(searchQuery);
            IEnumerable<ApplicationUser?> users = await _userManager.Users.Where(u => u.Name!.Contains(normalizedString) ||
                    u.UserName!.Contains(normalizedString) ||
                    u.Email!.Contains(normalizedString))
                .ToListAsync();
            if(users.IsNullOrEmpty()) {
                return null;
            }
            users = orderBy switch {
                "Name" => direction == 0 ? users.OrderBy(u => u!.Name) : users.OrderByDescending(u => u!.Name),
                "Email" => direction == 0 ? users.OrderBy(u => u!.Email) : users.OrderByDescending(u => u!.Email),
                _ => users
            };
            return users;
        }

        /// <summary>
        /// Service to get a user by its name from controller  "GetUserByName"
        /// </summary>
        public async Task<IEnumerable<ApplicationUser?>> GetUserByNameAsync(string name) {

            if(name.IsNullOrEmpty()) {
                throw new ArgumentNullException(nameof(name));
            }
            string normName = GenericHelper.RemoveDiacritics(name);
            IEnumerable<ApplicationUser?> users = await _userManager.Users.Where(u => u.Name!.Contains(normName) || u.UserName!.Contains(normName)).ToListAsync();
            return users;
        }

        /// <summary>
        /// Service to register a new user from controller  "Register"
        /// </summary>
        public async Task<(int, string)> Registration(Registration model) {

            ApplicationUser? userExists = await _userManager.FindByEmailAsync(model.Email!);
            if(userExists != null) {
                return (0, "User already exists!");
            }
            //Until Frontend is not ready upload a default picture. In frontend user will be able to choose picture from file system
            const string filePath = @"C:\Temp\DefaultPicture.jpg";

            ApplicationUser user = new() {
                Id = Guid.NewGuid(),
                Name = model.Name,
                UserName = GenericHelper.RemoveDiacritics(model.Name!),
                Email = model.Email,
                Picture = await File.ReadAllBytesAsync(filePath),
                PhoneNumber = model.PhoneNumber,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            string password = GenericHelper.GenerateRandomPassword();
            IdentityResult createUserResult = await _userManager.CreateAsync(user, password);

            if(!createUserResult.Succeeded) {
                return (0, "User creation failed! Please check user details and try again.");
            }
            if(!await _roleManager.RoleExistsAsync(model.Role!)) {
                return (0, "Role does not exist!");
            }
            if(await _roleManager.RoleExistsAsync(model.Role!)) {
                await _userManager.AddToRoleAsync(user, model.Role!);
            }

            EmailHelper.SendEmail(user.Email!, "Welcome to Uno-Onboard",
                $"Hello {user.Name} welcome to Uno-Onboard. This is your account data:\n\n" +
                $"Name:     {user.Name}\n" +
                $"Password: {password}\n" +
                $"Role:     {model.Role}\n" +
                $"Email:    {user.Email}\n" +
                $"Phone:    {user.PhoneNumber}");

            return (1, $"User {user.Name} with Id {user.Id} created successfully!");
        }

        /// <summary>
        /// Service to log in a user from controller  "Login"
        /// </summary>
        public async Task<(int, LoginResult)> Login(Login model) {

            ApplicationUser? user = await _userManager.FindByEmailAsync(model.Email!);
            LoginResult loginResult = new();
          
            if(user == null) {
                loginResult.LoginFailureReason = "User does not exist in the system";
                return (0, loginResult);
            }
            if(!await _userManager.CheckPasswordAsync(user, model.Password!)) {
                loginResult.LoginFailureReason = "Invalid Password";
                return (0, loginResult);
            }

            IList<string> userRoles = await _userManager.GetRolesAsync(user);
            List<Claim> authClaims = new List<Claim> {
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) //Unique identifier for the token - openid connect core StandardClaims
            };

            foreach (string userRole in userRoles) {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            string token = TokenHelper.GenerateJwtToken(authClaims, _configuration);

            loginResult.UserId = user.Id;
            loginResult.IsLoginSuccessful = true;
            loginResult.UserName = user.Name;
            loginResult.Token = token;
            loginResult.Expiration = DateTime.Now.AddMinutes(50).ToString("o",CultureInfo.InvariantCulture);
            loginResult.Role = userRoles.FirstOrDefault();
            
            return (1, loginResult);
        }

        /// <summary>
        /// Service to create a refresh token from controller and store it in the database from controller  "Login"
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<(int, RefreshTokens?)> CreateRefreshToken(string email) {

            ApplicationUser? user = await _userManager.FindByEmailAsync(email);
            if (user == null) {
                return (0, null);
            }
            RefreshTokens refreshToken = TokenHelper.GenerateRefreshToken(user.Id);
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
            return (1, refreshToken);
        }

        /// <summary>
        /// Service to recover User Password from controller  "PasswordRecovery"
        /// </summary>
        public async Task<(int, string)> PasswordRecoveryAsync(string email) {

            ApplicationUser? user = await _userManager.FindByEmailAsync(email);
            if(user == null) {
                return (0, "User does not exist!");
            }
            string newPassword = GenericHelper.GenerateRandomPassword();
            string token = await _userManager.GeneratePasswordResetTokenAsync(user);
            IdentityResult result = await _userManager.ResetPasswordAsync(user, token, newPassword);

            if (result.Succeeded) {
               EmailHelper.SendEmail(user.Email!, "Uno-Onboard Password Recovery",
                                      $"Hello {user.Name} your password has been changed. This is your new password:\n\n" +
                                                         $"Password: {newPassword}\n");
               return (1, $"The password has been changed successfully and sent to your email address: {user.Email}");
            }

            return (0, "Password could not be changed. Please try again!");
        }

        /// <summary>
        /// Service to update a user from controller  "UpdateUser"
        /// </summary>
        public async Task<ApplicationUser?> UpdateUserAsync(ApplicationUser user) {

            IdentityResult identityResult = await _userManager.UpdateAsync(user);
            return identityResult.Succeeded ? user : null;
        }

        /// <summary>
        /// Service to delete a user by its id from controller  "DeleteUserById"
        /// </summary>
        public async Task<ApplicationUser?> DeleteUserByIdAsync(Guid id) {

            if (id == Guid.Empty) {
                throw new ArgumentNullException(nameof(id));
            }
            ApplicationUser? user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) {
                return null;
            }
            IdentityResult result = await _userManager.DeleteAsync(user);
            return !result.Succeeded ? null : user;
        }

        /// <summary>
        /// Service to log out user from the system from controller  "LogOff"
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<bool> UserLogout(RefreshTokens token) {

            RefreshTokens? refreshToken = await _context.RefreshTokens.Where(rt => rt.Id == token.Id).FirstOrDefaultAsync();
            if (refreshToken == null) {
                return false;
            }
            
            refreshToken.Revoked = true;
            refreshToken.UpdatedAt = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture);
            _context.RefreshTokens.Update(refreshToken);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
