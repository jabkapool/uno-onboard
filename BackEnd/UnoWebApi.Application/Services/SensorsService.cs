using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Application.Dtos;
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

        public async Task<IEnumerable<SensorsDto>> GetSensorsByUserAsync(ApplicationUserDto user) {

            IEnumerable<SensorsDto> sensorsDto;
            if(user.Role == "Admin") {
                sensorsDto = _mapper.Map<IEnumerable<SensorsDto>>(await _unoDbContext.Sensors.ToListAsync());
                return sensorsDto;
            }
            sensorsDto = _mapper.Map<IEnumerable<SensorsDto>>(await _unoDbContext.Sensors.Where(s => s.UserId == user.Id ||
                                                                                                     s.IsPrivate == false)
                                                                                          .ToListAsync());
            return sensorsDto;
        }

        public async Task<SensorsDto?> GetSensorByIdAsync(Guid sensorId) {

            Sensors? sensor = await _unoDbContext.Sensors.FirstOrDefaultAsync(s => s.Id == sensorId);
            if(sensor == null) {
                return null;
            }
            return _mapper.Map<SensorsDto>(sensor);
        }

        public async Task<IEnumerable<SensorsDto?>?> ListSensorsAsync(string searchQuery, string orderBy, int direction) {

            IEnumerable<Sensors?>? sensors = await _unoDbContext.Sensors
                .Where(s => s.Name!.Contains(searchQuery) || s.Description!.Contains(searchQuery) || s.Category!.Contains(searchQuery))
                .ToListAsync();
            if(orderBy == "Name") {
                sensors = direction == 0 ? sensors.OrderBy(s => s!.Name) : sensors.OrderByDescending(s => s!.Name);
            } 
            else if(orderBy == "Description") {
                sensors = direction == 0 ? sensors.OrderBy(s => s!.Description) : sensors.OrderByDescending(s => s!.Description);
            }
            else if ((orderBy == "Category")) {
                sensors = direction == 0 ? sensors.OrderBy(s => s!.Category) : sensors.OrderByDescending(s => s!.Category);
            }
            return _mapper.Map<IEnumerable<SensorsDto>>(sensors);
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

            Sensors sensor = _mapper.Map<Sensors>(sensorDto);
            try {
                _unoDbContext.Sensors.Update(sensor);
                await _unoDbContext.SaveChangesAsync();
            } catch (DbUpdateException ex) {
                throw new DbUpdateException("Error updating sensor", ex);
            }
            return _mapper.Map<SensorsDto>(sensor);
        }

        public async Task<IEnumerable<FavouriteSensorDto?>?> GetFavouriteSensorsAsync(Guid userId) {

            IEnumerable<FavouriteSensor?>? favouriteSensors = await _unoDbContext.FavouriteSensors.Where(fs => fs.UserId == userId).ToListAsync();
            return _mapper.Map<IEnumerable<FavouriteSensorDto>>(favouriteSensors);
        }

        public async Task<bool> CheckIfSensorIsFavourite(Guid sensorId, Guid userId) {

            FavouriteSensor? favouriteSensor = await _unoDbContext.FavouriteSensors
                .FirstOrDefaultAsync(fs => fs.UserId == userId && fs.SensorId == sensorId);
            if(favouriteSensor != null) {
                return true;
            }
            return false;
        }

        public async Task<bool> AddOrRemoveSensorAsFavouriteAsync(FavouriteSensorDto favouriteSensorDto) {

            FavouriteSensor favouriteSensor = _mapper.Map<FavouriteSensor>(favouriteSensorDto);
            if(favouriteSensorDto.MarkAsFavourite) {
                favouriteSensor.Id = Guid.NewGuid();
                _unoDbContext.FavouriteSensors.Add(favouriteSensor);
            } 
            else {
                FavouriteSensor? existingfavouriteSensor = await _unoDbContext.FavouriteSensors
                    .FirstOrDefaultAsync(fs => fs.UserId == favouriteSensor.UserId
                                            && fs.SensorId == favouriteSensor.SensorId);
                if(existingfavouriteSensor == null) {
                    return false;
                }
                _unoDbContext.FavouriteSensors.Remove(existingfavouriteSensor);
            }
            try {
                await _unoDbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex) {
                throw new DbUpdateException("Error adding or removing sensor as favourite", ex);
            }
            return true;
        }

        public async Task<bool> AddSensorDataAsync(Guid sensorId, IEnumerable<SensorDataDto> sensorDataDto) {

            IEnumerable<SensorData> sensorData = _mapper.Map<IEnumerable<SensorData>>(sensorDataDto);
            foreach(SensorData sd in sensorData) {
                sd.Id = Guid.NewGuid();
                sd.SensorId = sensorId;
            }
            try {
                await _unoDbContext.SensorsData.AddRangeAsync(sensorData);
                await _unoDbContext.SaveChangesAsync();
            }
            catch(DbUpdateException ex) {
                throw new DbUpdateException("Error adding sensor data", ex);
            }
            return true;
        }

        public async Task<IEnumerable<SensorDataDto>> GetSensorDataAsync(Guid sensorId, DateTime fromDate, DateTime toDate) {

            IEnumerable<SensorData> sensorData = await _unoDbContext.SensorsData
                                                            .Where(sd => sd.SensorId == sensorId && 
                                                                   sd.TimeStamp >= fromDate && 
                                                                   sd.TimeStamp <= toDate)
                                                            .Include(s => s.Sensor)
                                                            .OrderBy(s => s.Sensor!.Name)
                                                            .OrderBy(s => s.TimeStamp)
                                                            .ToListAsync();

            return _mapper.Map<IEnumerable<SensorDataDto>>(sensorData);
        }
     
        public async Task<IEnumerable<FavouriteSensorsDataDto>> GetFavouriteSensorsDataAsync(Guid userId, DateTime fromDate, DateTime toDate) {

            IEnumerable<FavouriteSensor> favouriteSensors = await _unoDbContext.FavouriteSensors.Where(fs => fs.UserId == userId).ToListAsync();
           
            List<FavouriteSensorsDataDto> sensorDataDtoList = new();

            foreach(FavouriteSensor fs in favouriteSensors) {
                var sensorData = await _unoDbContext.SensorsData.Where(sd => 
                                                                            fs.SensorId == sd.SensorId && 
                                                                            sd.TimeStamp >= fromDate && 
                                                                            sd.TimeStamp <= toDate)
                                                                 .Include(s => s.Sensor)
                                                                 .OrderBy(s => s.TimeStamp)
                                                                 .ToListAsync();

                sensorDataDtoList.Add(new FavouriteSensorsDataDto {
                    SensorId = fs.SensorId,
                    SensorDataDto = _mapper.Map<IEnumerable<SensorDataDto>>(sensorData)
                });

            }
            return sensorDataDtoList;
        }

        public async Task<bool> CheckSensorExists(Guid sensorId) {

            Sensors? sensor = await _unoDbContext.Sensors.FirstOrDefaultAsync(s => s.Id == sensorId);
            if(sensor != null) {
                return true;
            }
            return false;
        }

    }
}
