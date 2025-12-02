using Cars.Api.Hubs;
using Cars.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<ICarService, CarService>();
builder.Services.AddHostedService<RegistrationMonitorService>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<RegistrationHub>("/hubs/registration");

app.Run();
