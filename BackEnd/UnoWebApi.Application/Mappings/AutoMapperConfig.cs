using AutoMapper;

namespace UnoWebApi.Application.Mappings {
    public static class AutoMapperConfig {
        public static MapperConfiguration ConfigureUnoOnboard() {
            MapperConfiguration? mapperConfig = new MapperConfiguration(cfg => {
                cfg.AddProfile<UnoOnboardProfile>();
            });
            return mapperConfig;
        }
    }
}
