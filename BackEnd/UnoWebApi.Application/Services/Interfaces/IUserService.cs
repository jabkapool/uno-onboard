using UnoWebApi.Domain.Entities;
using UnoWebApi.Domain.Models;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface IUserService {
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser?> GetUserByIdAsync(Guid id);
        Task<IEnumerable<ApplicationUser?>?> ListUsersAsync(string searchQuery, string orderBy, int direction);
        Task<IEnumerable<ApplicationUser?>> GetUserByNameAsync(string name);
        Task<(int, string)> Registration(Registration model);
        Task<(int, LoginResult)> Login(Login model);
        Task<(int, RefreshTokens?)> CreateRefreshToken(string email);
        Task<(int, string)> PasswordRecoveryAsync(string email);
        Task<ApplicationUser?> UpdateUserAsync(ApplicationUser user);
        Task<ApplicationUser?> DeleteUserByIdAsync(Guid id);
        Task<bool> UserLogout(RefreshTokens token);
    }
}
