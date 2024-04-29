using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace UnoWebApi.Infrastructure.Context.Interfaces {
    /// <summary>
    /// Interface to abstract the use of DbContext of Entity Framework Core.
    /// Add other methods as required.
    /// </summary>
    public interface IDbContext: IDisposable {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
        ChangeTracker ChangeTracker { get; }
    }
}
