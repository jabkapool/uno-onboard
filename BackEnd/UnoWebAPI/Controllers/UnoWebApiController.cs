using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace UnoWebAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UnoWebApiController: ControllerBase {

        private readonly IConfiguration _configuration;

        public UnoWebApiController(IConfiguration configuration) {
            _configuration = configuration;
        }

        [HttpGet("Version")]
        public ActionResult<UnoWebApiVersion> GetUnoWebApiVersion() {
            UnoWebApiVersion version = new UnoWebApiVersion {
                Version = _configuration["UnoWebApiVersion"],
                Timestamp = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture)
            };
            return Ok(version);
        }

        [HttpGet("CheckDbConnection")]
        public ActionResult CheckDbConnection() {
            string connectionString = _configuration.GetConnectionString("UnoDbContext")!;
            using SqlConnection connection = new SqlConnection(connectionString);
            try {
                connection.Open();
                return Ok("Connection to database is successful");
            }
            catch (Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }   
    }
}
