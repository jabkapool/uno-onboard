using UnoWebApi.Application.Dtos;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface ISensorsService {
        Task<IEnumerable<SensorsDto>> GetAllSensorsAsync();
        Task<IEnumerable<SensorsDto>> GetSensorsByUserAsync(ApplicationUserDto user);
        Task<SensorsDto?> GetSensorByIdAsync(Guid sensorId);
        Task<IEnumerable<SensorsDto?>?> ListSensorsAsync(string searchQuery, string orderBy, int direction);
        Task<SensorsDto> CreateSensorAsync(SensorsDto sensorDto);
        Task<SensorsDto> UpdateSensorAsync(SensorsDto sensorDto);
        Task<IEnumerable<FavouriteSensorDto?>?> GetFavouriteSensorsAsync(Guid userId);
        Task<bool> CheckIfSensorIsFavourite(Guid sensorId, Guid userId);
        Task<bool> AddOrRemoveSensorAsFavouriteAsync(FavouriteSensorDto favouriteSensorDto);
        Task<bool> AddSensorDataAsync(Guid sensorId, IEnumerable<SensorDataDto> sensorDataDto);
        Task<IEnumerable<SensorDataDto>> GetSensorDataAsync(Guid sensorId, DateTime fromDate, DateTime toDate);
        Task<IEnumerable<FavouriteSensorsDataDto>> GetFavouriteSensorsDataAsync(Guid userId, DateTime fromDate, DateTime toDate);
        Task<bool> CheckSensorExists(Guid sensorId);
    }
}
