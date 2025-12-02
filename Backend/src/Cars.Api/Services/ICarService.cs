using Cars.Api.Model.Entities;

namespace Cars.Api.Services
{
    public interface ICarService
    {
        IReadOnlyCollection<Car> GetAll(string? makeFilter = null);
    }
}
