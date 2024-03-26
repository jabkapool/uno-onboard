using UnoWebAPI.Services;

namespace UnoWebAPI {
    public class Program {
        public static void Main(string[] args) {

            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
            ConfigurationManager config = builder.Configuration;

            builder.Services.AddRegisterServices(builder);
            builder.Services.AddSwaggerConfiguration();
            builder.Services.AddAuthenticationConfiguration(config);

            WebApplication app = builder.Build();
            // Configure the HTTP request pipeline.
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.Run();
        }
    }
}
