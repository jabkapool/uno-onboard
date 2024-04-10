using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Domain.DTOs;

namespace UnoWebAPI.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class SensorController: ControllerBase {

        private readonly ISensorsService _sensorsService;
        public SensorController(ISensorsService sensorsService) {
            _sensorsService = sensorsService;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPost]
        public async Task<ActionResult> CreateSensor([FromBody] SensorsDto sensorDto) {

            string? userId;
            if(User.Identity!.IsAuthenticated) {
                userId = User.FindFirstValue(ClaimTypes.Sid);
            }
            else {
                return Unauthorized();
            }

            await _sensorsService.CreateSensor(sensorDto);
            return Ok("Sensor Created");
        }
    }
}
