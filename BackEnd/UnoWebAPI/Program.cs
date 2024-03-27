using UnoWebAPI.Services;

namespace UnoWebAPI {
    public class Program {
        public static void Main(string[] args) {

            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
            ConfigurationManager config = builder.Configuration;

            builder.Services.AddEndpointsApiExplorer();
            string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options => {
                options.AddPolicy(myAllowSpecificOrigins, policy => {
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

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

            app.UseCors(myAllowSpecificOrigins);
            app.MapControllers();
            app.Run();
        }
    }
}
