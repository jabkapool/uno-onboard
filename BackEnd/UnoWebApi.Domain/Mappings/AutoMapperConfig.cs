using AutoMapper;

namespace UnoWebApi.Domain.Mappings {
    public static class AutoMapperConfig {
        public static MapperConfiguration ConfigureUnoOnboard() {
            var mapperConfig = new MapperConfiguration(cfg => {
                cfg.AddProfile<UnoOnboardProfile>();
            });
            return mapperConfig;
        }
    }
}
