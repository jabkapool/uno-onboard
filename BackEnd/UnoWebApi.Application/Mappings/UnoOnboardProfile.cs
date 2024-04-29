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

            CreateMap<SensorData, SensorDataDto>()
                .ForMember(dest => dest.SensorName, opt => opt.MapFrom(src => src.Sensor!.Name))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Sensor!.Category));
            CreateMap<SensorDataDto, SensorData>()
                .ForMember(dest => dest.Sensor, opt => opt.Ignore());
        }
    }
}
