namespace UnoWebApi.Application.Dtos {
    public class ApplicationUserDto {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Picture { get; set; }
    }
}
