using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnoWebApi.Application.Helpers;
using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Application.Dtos;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Domain.Models;

namespace UnoWebAPI.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;
        public UserController(IUserService userService, ILogger<UserController> logger) {
            _userService = userService;
            _logger = logger;
        }

        /// <summary>
        /// Get all the users in the system.
        /// </summary>
        /// <returns>All the users in the system.</returns>
        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUserDto>>> GetAllUsers() {

            IEnumerable<ApplicationUserDto> users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        /// <summary>
        /// Http method to get a user by its id.
        /// </summary>
        /// <param name="id">The Guid of the user.</param>
        /// <returns>The user object.</returns>
        [Authorize(Roles = "Admin")]
        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<ApplicationUserDto?>> GetUserById(Guid id) {

            ApplicationUserDto? applicationUserDto = await _userService.GetUserByIdAsync(id);
            if (applicationUserDto == null) {
                return NotFound("User not found!");
            }
            return Ok(applicationUserDto);
        }

         /// <summary>
        /// Filter users by name or email.
        /// <param name="searchQuery">The query to search users in columns Name and Email</param>
        /// <param name="orderBy">Order by Name or Email</param>
        /// <param name="direction">0 for ascending, 1 for descending</param>
        /// <returns>A list of ordered users.</returns>
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("ListUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUserDto>>> ListUsers(string searchQuery, string orderBy = "Name", int direction = 0) {

            IEnumerable<ApplicationUserDto?>? applicationUserDto = await _userService.ListUsersAsync(searchQuery, orderBy, direction);
            if(applicationUserDto == null) {
                return NotFound("No users found!");
            }
            return Ok(applicationUserDto);
        }

        /// <summary>
        /// Http method to get a user by its name.
        /// </summary>
        /// <param name="name">string with the name of the user.</param>
        /// <returns>The user object.</returns>
        [Authorize(Roles = "Admin")]
        [HttpGet("GetUserByName")]
        public async Task<ActionResult<IEnumerable<ApplicationUserDto?>>> GetUserByName(string name) {

            IEnumerable<ApplicationUserDto?> applicationUserDto = await _userService.GetUserByNameAsync(name);
            return Ok(applicationUserDto);
        }

        /// <summary>
        /// Http method to register a user in the system.
        /// </summary>
        /// <param name="model">The registration model with the required information to fill: Name. Email, Role, Phone.</param>
        /// <returns>User created if successful.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost("Create")]
        public async Task<IActionResult> Register(Registration model) {

            try {
                if(!ModelState.IsValid) {
                    return BadRequest("Invalid payload!");
                }
                if(!EmailHelper.IsEmailValid(model.Email!)) {
                    return BadRequest("Invalid email address!");
                }
                (int status, string message) = await _userService.Registration(model);
                if(status == 0) {
                    return BadRequest(message);
                }
                return Ok(new { OkMessage = message });
            }
            catch(Exception ex) {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Http method to login into the system.
        /// </summary>
        /// <param name="model">The login model represented by name and password.</param>
        /// <returns>Access to the system producing a bearer token.</returns>
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(Login model) {

            try {
                if(!ModelState.IsValid) {
                    return BadRequest("Invalid payload!");
                }
                (int status, LoginResult loginResult) = await _userService.Login(model);
                if(status == 0) {
                    return BadRequest(loginResult);
                }
                (int refreshTokenStatus, _) = await _userService.CreateRefreshToken(model.Email!);
                if (refreshTokenStatus == 0) {
                    return BadRequest("Failed to create refresh token!");
                }
                return Ok(loginResult);
            }
            catch(Exception ex) {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Http method to change user's password.
        /// </summary>
        /// <param name="user">The user email.</param>
        /// <returns>Ok 200 on success, otherwise Error http 40x</returns>
        [AllowAnonymous]
        [HttpPut("PasswordRecovery")]
        public async Task<IActionResult> PasswordRecovery([FromBody] PasswordRecovery user) {

            try {
                if (!EmailHelper.IsEmailValid(user.Email!)) {
                    return BadRequest("Invalid email address!");
                }
                (int status, string message) = await _userService.PasswordRecoveryAsync(user.Email!);
                if (status == 0) {
                    return BadRequest(message);
                }
                return Ok(new {OkMessage = message});
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Http method to update a user in the system.
        /// </summary>
        /// <param name="userDto">The Dto with the fields that can be updated: Name. Email, Phone.</param>
        /// <returns>The updated user.</returns>
        [Authorize(Roles="Admin")]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] ApplicationUserDto userDto) {

            try {
                if (!ModelState.IsValid) {
                    return BadRequest("Invalid payload!");
                }
                ApplicationUserDto? applicationUserDto = await _userService.GetUserByIdAsync(userDto.Id);
                if (applicationUserDto == null) {
                    return NotFound("User not found!");
                }
                applicationUserDto = await _userService.UpdateUserAsync(userDto);
                if (applicationUserDto == null) {
                    return NotFound("Could not update user!");
                }
                return Ok(applicationUserDto);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Delete user by its id.
        /// </summary>
        /// <param name="id">id of the user to be deleted.</param>
        /// <returns>Message: User deleted successfully!</returns>
        [Authorize(Roles="Admin")]
        [HttpDelete("DeleteUserById/{id}")]
        public async Task<IActionResult> DeleteUserByIdAsync(Guid id) {

            try {
                ApplicationUser? user = await _userService.DeleteUserByIdAsync(id);
                if (user == null) {
                    return NotFound("User not found!");
                }
                return Ok(new { OkMessage = "User deleted successfully!" });
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        ///<summary>
        /// Logout user from the application
        ///</summary>
        [Authorize(Roles = "Admin, User")]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout([FromBody] ApplicationUserDto user) {
            bool logOutUser = await _userService.UserLogout(user.Id);
            if (!logOutUser) {
                return BadRequest("Failed logging out the user!");
            }
            return Ok(new { OkMessage = "User logged out successfully!" });
        }
    }
}
