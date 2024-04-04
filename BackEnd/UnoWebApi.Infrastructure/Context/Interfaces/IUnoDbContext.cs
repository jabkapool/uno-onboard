using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Infrastructure.Context.Interfaces {
    public interface IUnoDbContext: IDbContext {
        DbSet<RefreshTokens> RefreshTokens { get; set; }
    }
}
