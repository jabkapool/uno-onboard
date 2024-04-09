namespace UnoWebApi.Domain.Entities {
    public class SensorData {

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
        /// Navigation Property for the Sensor that the SensorData belongs to.
        /// </summary>
        public virtual Sensors? Sensor { get; set; }
    }
}
