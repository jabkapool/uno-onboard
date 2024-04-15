namespace UnoWebApi.Application.Dtos {
    public class FavouriteSensorDto {

        /// <summary>
        /// The unique identifier for the user favourite sensor.
        /// </summary>
        public Guid? Id { get; set; }

        /// <summary>
        /// The unique identifier for the user.
        /// </summary>
        public Guid? UserId { get; set; }
   
        /// <summary>
        /// The unique identifier for the sensor.
        /// </summary>
        public Guid SensorId { get; set; }

        /// <summary>
        /// boolean value to indicate if the sensor should be marked as user favourite or removed.
        /// </summary>
        public bool MarkAsFavourite { get; set; }
    }
}
