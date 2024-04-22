namespace UnoWebApi.Application.Dtos {
    public class SensorDataDto {

        /// <summary>
        /// The Id of the SensorData. PK
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The SensorId to which the SensorData belongs to. FK
        /// </summary>
        public Guid SensorId { get; set; }

        /// <summary>
        /// Sensor Data composed of timeStamp values.
        /// </summary>
        public DateTime TimeStamp { get; set; }

        /// <summary>
        /// Sensor Data composed of numeric values.
        /// </summary>
        public double NumericValues { get; set; }

        /// <summary>
        /// The name of the Sensor to which the SensorData belongs to.
        /// 
        public string? SensorName { get; set; }

        /// <summary>
        /// The Description of the Sensor to which the SensorData belongs to.
        /// </summary>
        public string? Category { get; set; }
    }
}
