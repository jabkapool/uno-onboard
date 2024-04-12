using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Domain.Dtos;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Infrastructure.Context.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace UnoWebApi.Application.Services {
    public class SensorsService : ISensorsService {

        private readonly IUnoDbContext _unoDbContext;
        private readonly IMapper _mapper;
        public SensorsService(IUnoDbContext unoDbContext, IMapper mapper) {
            _unoDbContext = unoDbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SensorsDto>> GetAllSensorsAsync() {

            IEnumerable<SensorsDto> sensorsDto = _mapper.Map<IEnumerable<SensorsDto>>(await _unoDbContext.Sensors.ToListAsync());
            return sensorsDto;
        }

        public async Task<SensorsDto> CreateSensorAsync(SensorsDto sensorDto) {

            Sensors sensor = _mapper.Map<Sensors>(sensorDto);
            sensor.Id = Guid.NewGuid();
            try {
                _unoDbContext.Sensors.Add(sensor);
                await _unoDbContext.SaveChangesAsync();
            } 
            catch (DbUpdateException ex) {
                throw new DbUpdateException("Error creating sensor", ex);
            }
            return _mapper.Map<SensorsDto>(sensor);
        }

        public async Task<SensorsDto> UpdateSensorAsync(SensorsDto sensorDto) {

            Sensors? sensors = _mapper.Map<Sensors>(sensorDto);
            try {
                sensors = await _unoDbContext.Sensors.FirstOrDefaultAsync(s => s.Id == sensorDto.Id);
            }
            catch (DbUpdateException ex) {
                throw new DbUpdateException("Could not find the sensor to update", ex);
            }

            try {
                _unoDbContext.Sensors.Update(sensors!);
                await _unoDbContext.SaveChangesAsync();
            } catch (DbUpdateException ex) {
                throw new DbUpdateException("Error updating sensor", ex);
            }
            return _mapper.Map<SensorsDto>(sensors);
        }

        public async Task<bool> AddOrRemoveSensorAsFavouriteAsync(FavouriteSensorDto favouriteSensorDto) {

            FavouriteSensor favouriteSensor = _mapper.Map<FavouriteSensor>(favouriteSensorDto);
            if(favouriteSensorDto.MarkAsFavourite) {
                _unoDbContext.FavouriteSensors.Add(favouriteSensor);
            } else {
                _unoDbContext.FavouriteSensors.Remove(favouriteSensor);
            }
            try {
                await _unoDbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex) {
                throw new DbUpdateException("Error adding or removing sensor as favourite", ex);
            }
            return true;
        }
    }
}


