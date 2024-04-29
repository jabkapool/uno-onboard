using System.ComponentModel.DataAnnotations;

namespace UnoWebApi.Domain.Models {
    public class PasswordRecovery {
        /// <summary>
        /// The Email of the user.
        /// </summary>
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
    }
}
