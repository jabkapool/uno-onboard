namespace UnoWebApi.Application.Dtos {
    public class SensorsDto {

        /// <summary>
        /// The Id of the Sensor. PK
        /// </summary>
        public Guid? Id { get; set; }

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
        /// When creating sensor it is the user logged in.
        /// It's the Foreign Key to the User table, recognized by the navigation property.
        /// </summary>
        public Guid? UserId { get; set; } = Guid.Empty;
    }
}
