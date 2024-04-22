using AutoMapper;
using UnoWebApi.Application.Dtos;
using UnoWebApi.Domain.Entities;

namespace UnoWebApi.Application.Mappings {
    public class UnoOnboardProfile : Profile {
        public UnoOnboardProfile() {
            //Automapper maps from Source to Destination.
            CreateMap<ApplicationUser, ApplicationUserDto>().ReverseMap();
            CreateMap<Sensors, SensorsDto>().ReverseMap();
            CreateMap<FavouriteSensor, FavouriteSensorDto>().ReverseMap();
            CreateMap<SensorData, SensorDataDto>().ReverseMap();
        }
    }
}
