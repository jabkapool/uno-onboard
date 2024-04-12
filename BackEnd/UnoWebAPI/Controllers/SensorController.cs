﻿using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UnoWebApi.Application.Services.Interfaces;
using UnoWebApi.Application.Dtos;

namespace UnoWebAPI.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class SensorController: ControllerBase {

        private readonly ISensorsService _sensorsService;
        public SensorController(ISensorsService sensorsService) {
            _sensorsService = sensorsService;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("GetAllSensors")]
        public async Task<ActionResult<IEnumerable<SensorsDto>>> GetSensors() {
            
            IEnumerable<SensorsDto> sensorsDto = await _sensorsService.GetAllSensorsAsync();
            return Ok(sensorsDto);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPost("CreateSensor")]
        public async Task<ActionResult<SensorsDto>> CreateSensor([FromBody] SensorsDto sensorDto) {

            Guid? userId = GetUserId(User);
            if(userId == null) {
                return Unauthorized();
            }
            sensorDto.UserId = userId;
            sensorDto = await _sensorsService.CreateSensorAsync(sensorDto);
            return Ok($"Sensor Created with Id: {sensorDto.Id}, " +
                                        $"Name: {sensorDto.Name}, " +
                                  $"Is Private: {sensorDto.IsPrivate}, " +
                                    $"Category: {sensorDto.Category}, " +
                                       $"Color: {sensorDto.Color}, " +
                                 $"Description: {sensorDto.Description}, " +
                               $"User Owner Id: {sensorDto.UserId}");
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPut("UpdateSensor")]
        public async Task<ActionResult> UpdateSensor([FromBody] SensorsDto sensorDto) {

            Guid? userId = GetUserId(User);
            if(userId == null) {
                return Unauthorized();
            }
            sensorDto.UserId = userId;
            if(sensorDto.UserId != userId) {
                return Unauthorized($"You are not authorized to update this sensor: {sensorDto.Name}");
            }
            await _sensorsService.UpdateSensorAsync(sensorDto);
            return Ok($"Sensor {sensorDto.Name} Updated with Id {sensorDto.Id}");
        }

        [Authorize(Roles="Admin, User")]
        [HttpPut("AddOrRemoveSensorAsFavourite")]
        public async Task<ActionResult> AddOrRemoveSensorAsFavourite([FromBody] FavouriteSensorDto favouriteSensorsDto) {

            //Validate user and check sensor exists
            Guid? userId = GetUserId(User);
            if(userId == null) {
                return Unauthorized();
            }
            bool sensorExists;
            sensorExists = await _sensorsService.CheckSensorExists(favouriteSensorsDto.SensorId);
            if(!sensorExists) {
                return NotFound($"Sensor with Id: {favouriteSensorsDto.SensorId} does not exist");
            }
            favouriteSensorsDto.UserId = userId;
            bool result = await _sensorsService.AddOrRemoveSensorAsFavouriteAsync(favouriteSensorsDto);
            if(!result) {
                return BadRequest($"Error adding or removing sensor as favourite. User Id: {favouriteSensorsDto.UserId}, Sensor Id: {favouriteSensorsDto.SensorId}");
            }
            return Ok($"The sensor has been added/removed as favourite from User Id: {favouriteSensorsDto.UserId}, Sensor Id: {favouriteSensorsDto.SensorId}");
        }

        private static Guid? GetUserId(ClaimsPrincipal user) {
            if(user?.Identity?.IsAuthenticated == true) {
                var claim = user.FindFirst(ClaimTypes.Sid);
                if(claim != null) {
                    return Guid.Parse(claim.Value);
                }
            }
            return null;
        }
    }
}
