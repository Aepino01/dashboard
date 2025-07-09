import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";
type Props = {
  city: string;
};

const coordenadasPorCiudad: Record<string, { latitude: number; longitude: number }> = {
  Guayaquil: { latitude: -2.17098, longitude: -79.92206 },
  Quito: { latitude: -0.22985, longitude: -78.52495 },
  Manta: { latitude: -0.957, longitude: -80.728 },
  Cuenca: { latitude: -2.9005, longitude: -78.9897 },
};

const DataFetcher = ({city}:Props) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coord =coordenadasPorCiudad[city]; 

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${coord.latitude}&longitude=${coord.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        const result: OpenMeteoResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { data, loading, error };
};

export default DataFetcher;