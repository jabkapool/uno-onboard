using UnoWebApi.Domain.DTOs;
using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Application.Services.Interfaces {
    public interface ISensorsService {
        Task<SensorsDto> CreateSensor(SensorsDto sensorDto);
    }
}
