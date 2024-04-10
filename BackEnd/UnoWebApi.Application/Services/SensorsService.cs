using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Domain.DTOs;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Infrastructure.Context.Interfaces;

namespace UnoWebApi.Application.Services {
    public class SensorsService : ISensorsService {

        private readonly IUnoDbContext _unoDbContext;
        public SensorsService(IUnoDbContext unoDbContext) {
            _unoDbContext = unoDbContext;
        }
        public async Task<SensorsDto> CreateSensor(SensorsDto sensorDto) {

            Sensors sensor = new Sensors {
                Id = Guid.NewGuid(),
                Name = sensorDto.Name,
                IsPrivate = sensorDto.IsPrivate,
                Description = sensorDto.Description,
                Category = sensorDto.Category,
                Color = sensorDto.Color,
                UserId = sensorDto.UserId
            };

            _unoDbContext.Sensors.Add(sensor);
            await _unoDbContext.SaveChangesAsync();
            return sensorDto;
        }
    }
}


