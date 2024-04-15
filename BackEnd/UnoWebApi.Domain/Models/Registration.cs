using System.ComponentModel.DataAnnotations;

namespace UnoWebApi.Domain.Models {
    public class Registration {
        public Registration() {
            Role = "User";
        }

        /// <summary>
        /// Name of the user in the system 
        /// </summary>
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        /// <summary>
        /// Email of the user when doing registration. Data from the registration will be sent to this email.
        /// </summary>
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        /// <summary>
        /// Role of the user in the system. Can be either Admin or User.
        /// </summary>
        [Required(ErrorMessage = "Role is required")]
        [RegularExpression("Admin|User", ErrorMessage = "Role must be Admin or User")]
        public string? Role { get; set; }

        /// <summary>
        /// User Phone number.
        /// </summary>
        [Required(ErrorMessage = "Phone number is required")]
        public string? PhoneNumber { get; set; }
    }
}
