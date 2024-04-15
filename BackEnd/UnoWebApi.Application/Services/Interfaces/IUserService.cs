using UnoWebApi.Domain.Entities;
using UnoWebApi.Domain.Models;
using UnoWebApi.Application.Dtos;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface IUserService {
        Task<IEnumerable<ApplicationUserDto>> GetAllUsersAsync();
        Task<ApplicationUserDto?> GetUserByIdAsync(Guid id);
        Task<IEnumerable<ApplicationUserDto?>?> ListUsersAsync(string searchQuery, string orderBy, int direction);
        Task<IEnumerable<ApplicationUserDto?>> GetUserByNameAsync(string name);
        Task<(int, string)> Registration(Registration model);
        Task<(int, LoginResult)> Login(Login model);
        Task<(int, RefreshTokens?)> CreateRefreshToken(string email);
        Task<(int, string)> PasswordRecoveryAsync(string email);
        Task<ApplicationUserDto?> UpdateUserAsync(ApplicationUserDto userDto);
        Task<ApplicationUser?> DeleteUserByIdAsync(Guid id);
        Task<bool> UserLogout(RefreshTokens token);
    }
}
