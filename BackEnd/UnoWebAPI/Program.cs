using Microsoft.EntityFrameworkCore;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Infrastructure.Context;

namespace UnoWebAPI {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            /*Add services to the container.   ** Not using Authorization yet **
            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                //.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));*/
            
            
            builder.Services.AddControllers();

            builder.Services.AddDbContext<UnoDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("UnoDbContext")));
            builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<UnoDbContext>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
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
