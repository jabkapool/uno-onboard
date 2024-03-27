using System.ComponentModel.DataAnnotations;

namespace UnoWebApi.Domain.Models {
    public class Login {
        /// <summary>
        /// The Email of the user.
        /// </summary>
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        /// <summary>
        /// User password.
        /// </summary>
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
