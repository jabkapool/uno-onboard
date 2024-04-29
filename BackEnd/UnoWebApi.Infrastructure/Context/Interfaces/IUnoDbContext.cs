using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Infrastructure.Context.Interfaces {
    public interface IUnoDbContext: IDbContext {
        DbSet<RefreshTokens> RefreshTokens { get; set; }
        DbSet<Sensors> Sensors { get; set; }
        DbSet<SensorData> SensorsData { get; set; }
        DbSet<FavouriteSensor> FavouriteSensors { get; set; }
    }
}
