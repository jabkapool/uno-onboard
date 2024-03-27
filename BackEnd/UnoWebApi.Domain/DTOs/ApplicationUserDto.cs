using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Domain.DTOs {
    public class ApplicationUserDto {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        //Temporary use of manual mapping between DTO and Entity. Will be replaced by AutoMapper.
        public static ApplicationUser ConvertDtoToEntity(ApplicationUserDto userDto, ApplicationUser user) {
            user.Id = userDto.Id;
            user.Name = userDto.Name;
            user.UserName = userDto.Name;
            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;
            return user;
        }
    }
}
