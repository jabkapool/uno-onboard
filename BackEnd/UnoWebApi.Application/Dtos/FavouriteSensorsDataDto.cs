namespace UnoWebApi.Application.Dtos {
    public class FavouriteSensorsDataDto {
        public Guid SensorId { get; set; }
        public IEnumerable<SensorDataDto>? SensorDataDto { get; set; }
    }
}
