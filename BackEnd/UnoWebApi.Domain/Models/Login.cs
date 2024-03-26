using System.ComponentModel.DataAnnotations;

namespace UnoWebApi.Domain.Models {
    public class Login {
        /// <summary>
        /// Name of the user.
        /// </summary>
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        /// <summary>
        /// User password.
        /// </summary>
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
