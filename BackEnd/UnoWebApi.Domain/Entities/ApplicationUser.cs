using Microsoft.AspNetCore.Identity;

namespace UnoWebApi.Domain.Entities {
    public class ApplicationUser : IdentityUser<Guid> {
        public string? Name { get; set; }
        public byte[]? Picture { get; set; }
    }
}
