using UnoWebApi.Application.Dtos;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface ISensorsService {
        Task<IEnumerable<SensorsDto>> GetAllSensorsAsync();
        Task<SensorsDto> CreateSensorAsync(SensorsDto sensorDto);
        Task<SensorsDto> UpdateSensorAsync(SensorsDto sensorDto);
        Task<bool> AddOrRemoveSensorAsFavouriteAsync(FavouriteSensorDto favouriteSensorDto);
        Task<bool> CheckSensorExists(Guid sensorId);
    }
}
