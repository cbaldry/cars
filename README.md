# Cars Full Stack Registration Monitor

A lightweight full-stack application.\
It includes a **.NET 10 Web API**, a **React + Vite frontend**, a
**background registration expiry monitor**, and **SignalR** for
real-time updates.

---

## Project Structure

    Cars
    ├── Backend
    │   └── src
    │       └── Cars.Api
    │           ├── Controllers
    │           ├── Data
    │           ├── Hubs
    │           ├── Model
    │           │   └── Entities
    │           └── Services
    └── Frontend
        ├── public
        └── src
            ├── cars
            ├── hooks
            └── registrations

---

## Requirements

- .NET 10 SDK
- Node.js 18+

---

# Backend .NET 10 API

### Run the API

```sh
cd /Backend/src/Cars.Api
dotnet restore
dotnet run
```

By default the API will listen on:

    http://localhost:5196    <- Primary API URL (HTTP)
    https://localhost:7286   <- HTTPS (framework default)

### Endpoints

---

Method Route Description

---

GET `/api/cars` Returns all cars, optional `?make=` filter

HUB `/hubs/registration` SignalR hub for live registration status updates

---

### Background Service

`RegistrationMonitorService` runs periodically to:

- Check if each car's registration has expired
- Update its status
- Push real-time updates to clients through SignalR

---

# Frontend React + Vite

### Run the UI

```sh
cd /Frontend
npm install
npm run dev
```

Vite will start at:

    http://localhost:5173

### API Configuration

The frontend uses:

```ts
export const BASE_URL = "http://localhost:5196";
```

Ensure this matches your backend port.

---

# Real-Time Updates (SignalR)

The frontend connects to:

    http://localhost:5196/hubs/registration

Updates automatically reflect in the **/registration** page, showing:

- `VALID` (green)
- `EXPIRED` (red)
- `PENDING` (amber)

---
