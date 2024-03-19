using Microsoft.AspNetCore.Identity;

namespace UnoWebApi.Domain.Entities {
    public class User : IdentityUser {
        public string? Name { get; set; }
        public byte[]? Picture { get; set; }
    }
}
