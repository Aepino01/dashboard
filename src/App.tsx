import './App.css'
import { Grid, Typography } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';

function App() {
   const { data, loading, error } = DataFetcher();

   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>
            <HeaderUI description="Título del dashboard" />
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
            <SelectorUI />
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
         <Grid
            sx={{
               display: { xs: 'none', md: 'block' }
            }}
         >
            Elemento: Gráfico
         </Grid>

         {/* Tabla */}
         <Grid
            sx={{
               display: { xs: 'none', md: 'block' }
            }}
         >
            Elemento: Tabla
         </Grid>

         {/* Información adicional */}
         <Grid>Elemento: Información adicional</Grid>

      </Grid>
   );
}

export default App;