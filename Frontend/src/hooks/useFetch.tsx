import { useState, useEffect } from "react";
import type { Car } from "../types";

export const BASE_URL = "http://localhost:5196";

export function useFetch(make?: string) {
  const [data, setData] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const query = make ? `?make=${encodeURIComponent(make)}` : "";
    const url = `${BASE_URL}/api/cars${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
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
  }, [make]);

  return { data, loading, error };
}
