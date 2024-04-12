using AutoMapper;
using UnoWebApi.Domain.Dtos;
using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Domain.Mappings {
    public class UnoOnboardProfile : Profile {
        public UnoOnboardProfile() {
            //Automapper maps from Source to Destination
            CreateMap<Sensors, SensorsDto>().ReverseMap();
            CreateMap<FavouriteSensor, FavouriteSensorDto>().ReverseMap();
            CreateMap<ApplicationUser, ApplicationUserDto>().ReverseMap();
        }
    }
}
