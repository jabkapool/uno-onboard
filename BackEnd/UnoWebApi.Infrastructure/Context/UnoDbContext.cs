using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Infrastructure.Context {
    public class UnoDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid> {
        public UnoDbContext(DbContextOptions<UnoDbContext> options) : base(options) {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
        }
    }
}
