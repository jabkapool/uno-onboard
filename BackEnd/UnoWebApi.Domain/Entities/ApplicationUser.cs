using Microsoft.AspNetCore.Identity;

namespace UnoWebApi.Domain.Entities {
    public class ApplicationUser : IdentityUser<Guid> {
        /// <summary>
        /// The Name of the User in the System.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// The Picture of the User in the system.
        /// </summary>
        public byte[]? Picture { get; set; }
    }
}
