using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Application.Services;
using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Infrastructure.Context;

namespace UnoWebAPI.Services {
    public static class RegisterServices {
        public static IServiceCollection AddRegisterServices(this IServiceCollection services, WebApplicationBuilder builder) {

            services.AddControllers();
            //Database
            services.AddDbContext<UnoDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("UnoDbContext")));

            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<UnoDbContext>()
                .AddDefaultTokenProviders();

            //Register Services here
            services.AddTransient<IUserService, UserService>();
            return services;
        }
    }
}
