import { useState } from 'react';
import './App.css'
import { Grid, Typography } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import CohereAssistant from './components/CohereAssistant';


function App() {
   const [cityInput, setCityInput] = useState<string>('Guayaquil');
   const { data, loading, error } = DataFetcher({ city: cityInput });

   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>
            <HeaderUI description="Dashboard Meteorológico" />
         </Grid>

         {/* Alertas */}
         <Grid
            container
            size={{ xs: 12, md: 12 }}
            justifyContent="flex-end"
            alignItems="center"
         >
            <AlertUI config={{ description: "No se preveen lluvias" }} />
         </Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3 }}>
            <SelectorUI
               cityInput={cityInput}
               setCityInput={setCityInput} 
            />
         </Grid>

         {/* Indicadores */}
         <Grid container size={{ xs: 12, md: 9 }} >
            {loading && (
               <Grid size={{ xs: 12 }}>
                  <Typography>Cargando datos...</Typography>
               </Grid>
            )}

            {error && (
               <Grid size={{ xs: 12 }}>
                  <Typography color="error">{error}</Typography>
               </Grid>
            )}

            {data && (
               <>
                  <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                        title='Temperatura (2m)'
                        description={`${data.current.temperature_2m}°C`}
                     />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                        title='Temperatura aparente'
                        description={`${data.current.apparent_temperature}°C`}
                     />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                        title='Velocidad del viento'
                        description={`${data.current.wind_speed_10m} km/h`}
                     />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI
                        title='Humedad relativa'
                        description={`${data.current.relative_humidity_2m}%`}
                     />
                  </Grid>
               </>
            )}
         </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
              <ChartUI 
                  arrLabels={data?.hourly.time || []}
                  arrValues1={data?.hourly.temperature_2m || []}
                  arrValues2={data?.hourly.wind_speed_10m || []}
               />
         </Grid>


         {/* Tabla */}
           <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
              <TableUI 
                  arrLabels={data?.hourly.time || []}
                  arrValues1={data?.hourly.temperature_2m || []}
                  arrValues2={data?.hourly.wind_speed_10m || []}
              />
           </Grid>

         {/* Información adicional */}
         <Grid>
           Elemento: Información adicional
           {data && <CohereAssistant weatherData={data.current} />}
         </Grid>

      </Grid>
   );
}

export default App;