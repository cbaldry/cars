import { useEffect, useRef, useState } from "react";
import {
  HubConnectionBuilder,
  HubConnectionState,
  type HubConnection,
} from "@microsoft/signalr";

import { BASE_URL } from "../hooks/useFetch";
import type { Car, CarWithStatus, RegoStatus } from "../types";

type RegistrationStatusUpdate = {
  carId: number;
  isExpired: boolean;
};

const HUB_URL = `${BASE_URL}/hubs/registration`;

export default function RegistrationPage() {
  const [cars, setCars] = useState<CarWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/cars`)
      .then((res) => res.json())
      .then((data) => {
        const status: RegoStatus = "PENDING";
        setCars(
          data.map((c: Car) => ({
            ...c,
            status,
          }))
        );
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!connectionRef.current) {
      const connection = new HubConnectionBuilder()
        .withUrl(HUB_URL)
        .withAutomaticReconnect()
        .build();

      connection.on(
        "RegistrationUpdated",
        (update: RegistrationStatusUpdate) => {
          setCars((prev) =>
            prev.map((c) => {
              if (c.id !== update.carId) {
                return c;
              }

              const status: RegoStatus = update.isExpired ? "EXPIRED" : "VALID";

              return { ...c, status };
            })
          );
        }
      );

      connectionRef.current = connection;

      connection.start().catch((err) => console.error(err));
    }

    return () => {
      const conn = connectionRef.current;
      if (conn?.state === HubConnectionState.Connected) {
        conn.stop();
      }
    };
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>
          Error loading data: {error.name} {error.message}
        </p>
      </>
    );
  }

  return (
    <div>
      <h1>Live Registration Status</h1>
      <p>Updates are pushed from a background service via SignalR.</p>

      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Reg #</th>
            <th>Expiry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.map((c) => (
              <tr key={c.id}>
                <td>{c.make}</td>
                <td>{c.model}</td>
                <td>{c.registrationNumber}</td>
                <td>
                  {new Date(c.registrationExpiry).toLocaleDateString("en-AU")}
                </td>
                <td>{c.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
