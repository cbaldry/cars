
using Cars.Api.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Cars.Api.Services
{
    public class RegistrationMonitorService : BackgroundService
    {
        private readonly ICarService _carService;
        private readonly IHubContext<RegistrationHub, IRegistrationHub> _hubContext;
        
        public RegistrationMonitorService(
            ICarService carService,
            IHubContext<RegistrationHub, IRegistrationHub> hubContext)
        {
            _carService = carService;
            _hubContext = hubContext;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            throw new NotImplementedException();
        }
    }
}
