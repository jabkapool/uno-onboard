using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Infrastructure.Context.Interfaces;

namespace UnoWebApi.Infrastructure.Context {
    public class UnoDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>, IUnoDbContext {
        public UnoDbContext(DbContextOptions<UnoDbContext> options) : base(options) {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<RefreshTokens> RefreshTokens { get; set; }
        public DbSet<Sensors> Sensors { get; set; }
        public DbSet<SensorData> SensorsData { get; set; }
        public DbSet<FavouriteSensor> FavouriteSensors { get; set; }
    }
}
