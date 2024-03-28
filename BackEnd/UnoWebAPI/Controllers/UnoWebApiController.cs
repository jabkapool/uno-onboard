using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace UnoWebAPI.Controllers {

    [Authorize(Roles = "Admin, User")]
    [Route("api/[controller]")]
    [ApiController]
    public class UnoWebApiController: ControllerBase {

        private readonly IConfiguration _configuration;
        public UnoWebApiController(IConfiguration configuration) {
            _configuration = configuration;
        }

        /// <summary>
        /// Get the Uno Web Api Version
        /// </summary>
        /// <returns>Returns the Uno Web Api Version and the Timestamp of the API version in ISO 8601 format.</returns>
        [HttpGet("Version")]
        public ActionResult<UnoWebApiVersion> GetUnoWebApiVersion() {
            UnoWebApiVersion version = new UnoWebApiVersion {
                Version = _configuration["UnoWebApiVersion"],
                Timestamp = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture)
            };
            return Ok(version);
        }

        /// <summary>
        /// Check the connection to the database
        /// </summary>
        /// <returns>Return message: "Connection to database is successful" if successful, Http 500 otherwise</returns>
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
