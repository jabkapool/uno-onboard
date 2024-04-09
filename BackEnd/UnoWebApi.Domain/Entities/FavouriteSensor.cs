using System.ComponentModel.DataAnnotations.Schema;

namespace UnoWebApi.Domain.Entities {
    public class FavouriteSensor {

        /// <summary>
        /// The Id of the FavouriteSensor. PK
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Id of the Sensor that is marked as favourite. FK
        /// </summary>
        public Guid SensorId { get; set; }

        /// <summary>
        /// Id of the User that marked the Sensor as favourite. FK
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Navigation Property for the Users that marked the Sensor as favourite.
        /// </summary>
        public virtual ApplicationUser? Users { get; set; }

        /// <summary>
        /// Navigation Property for the Sensors that are marked as favourite.
        /// </summary>
        public virtual Sensors? Sensors { get; set; }
    }
}
