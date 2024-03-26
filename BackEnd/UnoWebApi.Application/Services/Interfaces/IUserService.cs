using UnoWebApi.Domain.Entities;
using UnoWebApi.Domain.Models;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface IUserService {
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser?> GetUserByIdAsync(Guid id);
        Task<ApplicationUser?> GetUserByNameAsync(string name);
        Task<(int, string)> Registration(Registration model);
        Task<(int, string)> Login(Login model);
        Task<ApplicationUser?> UpdateUserAsync(ApplicationUser user);
        Task<ApplicationUser?> DeleteUserByIdAsync(Guid id);
    }
}
