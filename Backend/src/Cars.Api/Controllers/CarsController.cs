using Cars.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string? make = null)
        {
            var cars = _carService.GetAll(make);
            return Ok(cars);
        }
    }
}
