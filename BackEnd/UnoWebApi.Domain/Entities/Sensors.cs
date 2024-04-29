namespace UnoWebApi.Domain.Entities {
    public class Sensors {

        /// <summary>
        /// The Id of the Sensor. PK
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The Name of the Sensor.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Property that indicates if the Sensor is private or public.
        /// </summary>
        public bool IsPrivate { get; set; }

        /// <summary>
        /// The Description of the Sensor.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// The Category of the Sensor.
        /// </summary>
        public string? Category { get; set; }

        /// <summary>
        /// The Color of the Sensor.
        /// </summary>
        public string? Color { get; set; }

        /// <summary>
        /// Sensor Owner. FK
        /// The User Id to which the Sensor belongs to.
        /// It's the Foreign Key to the User table, recognized by the navigation property.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Navigation Property for the User that owns the Sensor. The User table.
        /// With this property we can navigate to the User that owns the Sensor.
        /// </summary>
        public virtual ApplicationUser? User { get; set; }

        /// <summary>
        /// Navigation Property for the Sensor data.
        /// </summary>
        public virtual ICollection<SensorData>? SensorsData { get; set; }

        /// <summary>
        /// Navigation Property for the Sensors marked as favourite.
        /// </summary>
        public virtual ICollection<FavouriteSensor>? FavouriteSensors { get; set; }
    }
}
