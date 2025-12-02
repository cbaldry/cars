using Cars.Api.Model.Entities;

namespace Cars.Api.Hubs
{
    public interface IRegistrationHub
    {
        Task RegistrationUpdated(Registration update);
    }
}
