using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Application.Services;
using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Infrastructure.Context;
using UnoWebApi.Infrastructure.Context.Interfaces;

namespace UnoWebAPI.Services {
    public static class RegisterServices {
        public static IServiceCollection AddRegisterServices(this IServiceCollection services, WebApplicationBuilder builder) {

            services.AddControllers();
            //Database
            services.AddDbContext<UnoDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("UnoDbContext")));

            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options => {
                    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzçABCDEFGHIJKLMNOPQRSTUVWXYZÇ ";
                })
                .AddEntityFrameworkStores<UnoDbContext>()
                .AddDefaultTokenProviders();

            //Register Services here
            services.AddScoped<IUnoDbContext, UnoDbContext>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ISensorsService, SensorsService>();
            return services;
        }
    }
}
