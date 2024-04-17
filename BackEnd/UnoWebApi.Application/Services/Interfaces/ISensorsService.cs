using UnoWebApi.Application.Dtos;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface ISensorsService {
        Task<IEnumerable<SensorsDto>> GetAllSensorsAsync();
        Task<SensorsDto?> GetSensorByIdAsync(Guid sensorId);
        Task<IEnumerable<SensorsDto?>?> ListSensorsAsync(string searchQuery, string orderBy, int direction);
        Task<SensorsDto> CreateSensorAsync(SensorsDto sensorDto);
        Task<SensorsDto> UpdateSensorAsync(SensorsDto sensorDto);
        Task<bool> AddOrRemoveSensorAsFavouriteAsync(FavouriteSensorDto favouriteSensorDto);
        Task<bool> CheckSensorExists(Guid sensorId);
        Task<bool> AddSensorDataAsync(Guid sensorId, IEnumerable<SensorDataDto> sensorDataDto);
        Task<IEnumerable<SensorDataDto>> GetSensorDataAsync(Guid sensorId, DateTime from, DateTime to);
    }
}
