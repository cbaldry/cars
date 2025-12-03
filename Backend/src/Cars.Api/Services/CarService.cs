using Cars.Api.Model.Entities;
using System.Text.Json;

namespace Cars.Api.Services
{
    public class CarService : ICarService
    {
        private readonly List<Car> _cars;

        public CarService(IWebHostEnvironment env)
        {
            var filePath = Path.Combine(env.ContentRootPath, "Data", "cars.json");
            var json = File.ReadAllText(filePath);
            _cars = JsonSerializer.Deserialize<List<Car>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new List<Car>();
        }

        public IReadOnlyCollection<Car> GetAll(string? makeFilter = null)
        {
            var query = _cars.AsQueryable();

            if (!string.IsNullOrWhiteSpace(makeFilter))
            {
                query = query.Where(c => c.Make.Contains(makeFilter, StringComparison.OrdinalIgnoreCase));
            }

            return query.ToList();
        }
    }
}
