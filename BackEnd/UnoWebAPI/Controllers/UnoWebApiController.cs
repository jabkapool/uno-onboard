using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace UnoWebAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UnoWebApiController: ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UnoWebApiController(IConfiguration configuration) {
            _configuration = configuration;
        }

        [HttpGet("Version")]
        public IActionResult GetUnoWebApiVersion() {
            var version = new UnoWebApiVersion {
                Version = _configuration["UnoWebApiVersion"],
                Timestamp = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture)
            };
            return Ok(version);
        }

        [HttpGet("CheckDbConnection")]
        public IActionResult CheckDbConnection()
        {
            var connectionString = _configuration.GetConnectionString("UnoContext");
            using var connection = new SqlConnection(connectionString);
            try {
                connection.Open();
                return Ok("Connection to database is successful");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }   
    }

    // O Projecto vai ter a seguinte estrutura:
    // UnoWebAPI - Vai ter todos os endpoints necessários                   | WebApi project
    // UnoWebApi.Domain             Entities, database models classes, etc  | Class Library project
    // UnoWebApi.Application        Business logic, services, etc           | Class Library project
    // UnoWebApi.Infrastructure     Database Migrations, DbContext, etc     | Class Library project
    // UnoWebApi.Tests

    // Se a estrutura ficar acordada a classe UnoWebApiVersion pode ser movida para o projecto UnoWebApi.Domain

}
