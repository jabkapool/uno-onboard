using Moq;
using Microsoft.EntityFrameworkCore;
using UnoWebApi.Application.Services;
using UnoWebApi.Application.Dtos;
using UnoWebApi.Domain.Entities;
using UnoWebApi.Infrastructure.Context.Interfaces;
using AutoMapper;
using UnoWebApi.UnitTests.Helpers;

namespace UnoWebApi.UnitTests {

    [TestFixture]
    public class SensorsServiceTests {
        private Mock<IUnoDbContext> _unoDbContextMock;
        private Mock<IMapper> _mapperMock;
        private SensorsService _sensorsService;

        [SetUp]
        public void Setup() {
            _unoDbContextMock = new Mock<IUnoDbContext>();
            _mapperMock = new Mock<IMapper>();
            _sensorsService = new SensorsService(_unoDbContextMock.Object, _mapperMock.Object);
        }

        private void ArrangeSensors(IEnumerable<Sensors> sensors, IEnumerable<SensorsDto> sensorsDto) {
            var dbSetMock = new Mock<DbSet<Sensors>>();
            dbSetMock.As<IAsyncEnumerable<Sensors>>()
                .Setup(m => m.GetAsyncEnumerator(new CancellationToken()))
                .Returns(new TestAsyncEnumerator<Sensors>(sensors.GetEnumerator()));

            dbSetMock.As<IQueryable<Sensors>>()
                .Setup(m => m.Provider)
                .Returns(new TestAsyncQueryProvider<Sensors>(sensors.AsQueryable().Provider));

            dbSetMock.As<IQueryable<Sensors>>().Setup(m => m.Expression).Returns(sensors.AsQueryable().Expression);
            dbSetMock.As<IQueryable<Sensors>>().Setup(m => m.ElementType).Returns(sensors.AsQueryable().ElementType);
            dbSetMock.As<IQueryable<Sensors>>().Setup(m => m.GetEnumerator()).Returns(sensors.GetEnumerator());

            _unoDbContextMock.Setup(db => db.Sensors).Returns(dbSetMock.Object);
            _mapperMock.Setup(m => m.Map<IEnumerable<SensorsDto>>(sensors)).Returns(sensorsDto);
        }

        [Test]
        public async Task GetAllSensorsAsync_ReturnsAllSensors() {
            // Arrange
            var sensors = new List<Sensors> { new Sensors(), new Sensors() };
            var sensorsDto = new List<SensorsDto> { new SensorsDto(), new SensorsDto() };

            ArrangeSensors(sensors, sensorsDto);
            // Act
            var result = await _sensorsService.GetAllSensorsAsync();
            // Assert
            Assert.That(result, Is.EqualTo(sensorsDto));
        }


        [Test]
        public async Task GetSensorsByUserAsync_ReturnsSensorsForAdminUser() {
            // Arrange
            var user = new ApplicationUserDto { Id = Guid.NewGuid(), Role = "Admin" };
            var sensors = new List<Sensors> { new Sensors { IsPrivate = true },
                                              new Sensors { IsPrivate = true }  };
            var sensorsDto = new List<SensorsDto> { new SensorsDto { IsPrivate = true },
                                                    new SensorsDto { IsPrivate = true } };

            ArrangeSensors(sensors, sensorsDto);
            // Act
            var result = await _sensorsService.GetSensorsByUserAsync(user);
            // Assert
            Assert.That(result, Is.EqualTo(sensorsDto));
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetSensorsByUserAsync_ReturnsZeroForNonAdminUserWhenAllSensorsArePrivate() {
            // Arrange
            var user = new ApplicationUserDto { Id = Guid.NewGuid(), Role = "User" };
            var sensors = new List<Sensors> { new Sensors { IsPrivate = true },
                                              new Sensors { IsPrivate = true }  };
            var sensorsDto = new List<SensorsDto> { new SensorsDto { IsPrivate = true },
                                                    new SensorsDto { IsPrivate = true } };

            ArrangeSensors(sensors, sensorsDto);
            // Act
            var result = await _sensorsService.GetSensorsByUserAsync(user);
            // Assert
            Assert.That(result.Count(), Is.EqualTo(0));
        }
    }
}
