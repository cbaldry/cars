import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function CarPage() {
  const [make, setMake] = useState("");

  const { data, loading, error } = useFetch(make);

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
      <h1>Cars</h1>

      <div>
        <input
          placeholder="Filter by make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Registration</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((c) => (
              <tr key={c.id}>
                <td>{c.make}</td>
                <td>{c.model}</td>
                <td>{c.year}</td>
                <td>{c.registrationNumber}</td>
                <td>
                  {new Date(c.registrationExpiry).toLocaleDateString("en-AU")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
