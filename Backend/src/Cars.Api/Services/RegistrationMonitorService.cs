
using Cars.Api.Hubs;
using Cars.Api.Model.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Cars.Api.Services
{
    public class RegistrationMonitorService : BackgroundService
    {
        private readonly ICarService _carService;
        private readonly IHubContext<RegistrationHub, IRegistrationHub> _hubContext;
        private readonly ILogger<RegistrationMonitorService> _logger;

        public RegistrationMonitorService(
            ICarService carService,
            IHubContext<RegistrationHub,IRegistrationHub> hubContext,
            ILogger<RegistrationMonitorService> logger
            )
        {
            _carService = carService;
            _hubContext = hubContext;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Registration monitor service started");

            while (!stoppingToken.IsCancellationRequested)
            {
                var cars = _carService.GetAll();
                var today = DateOnly.FromDateTime(DateTime.UtcNow);

                foreach (var car in cars)
                {
                    var carExpiryDate = DateOnly.FromDateTime(car.RegistrationExpiry);
                    var isExpired = carExpiryDate < today;

                    var update = new Registration
                    {
                        CarId = car.Id,
                        RegistrationNumber = car.RegistrationNumber,
                        IsExpired = isExpired
                    };

                    await _hubContext.Clients.All.RegistrationUpdated(update);
                }

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }

            _logger.LogInformation("Registration monitor stopping");
        }
    }
}
