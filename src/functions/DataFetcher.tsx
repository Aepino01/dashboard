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

const CACHE_MINUTES = 10;

const DataFetcher = ({city}:Props) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coord =coordenadasPorCiudad[city]; 

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${coord.latitude}&longitude=${coord.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    const datakey=`weather_${city}`;
    const cached= localStorage.getItem(datakey);
    let cacheData:{ data: OpenMeteoResponse; timestamp: number } | null = null;
    if (cached) {
      try {
        cacheData = JSON.parse(cached);
      } catch (e) {
        console.error("Error al parsear el cache:", e);
      }
    }

    const now = Date.now();
    const isCacheValid = cacheData && (now - cacheData.timestamp < CACHE_MINUTES * 60 * 1000);
    
    if (isCacheValid) {
      setData(cacheData!.data);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        const result: OpenMeteoResponse = await response.json();
        setData(result);
        localStorage.setItem(datakey, JSON.stringify({ data: result, timestamp: now }));
      } catch (err: any) {
        setData(cacheData!.data);
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