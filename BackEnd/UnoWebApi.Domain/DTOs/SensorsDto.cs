namespace UnoWebApi.Domain.DTOs {
    public class SensorsDto {

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
        public Guid UserId { get; set; } = Guid.Empty; //UserId is the logged-in user

        // Id is created by the database; Not included in the Dto 

    }
}
