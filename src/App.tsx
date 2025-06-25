import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI'; // Importa SelectorUI

function App() {
   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>
            <HeaderUI description="Título del dashboard" />
         </Grid>

         {/* Alertas */}
         <Grid
            container
            size={{ xs: 12, md: 3 }}
            justifyContent="flex-end"
            alignItems="center"
         >
            <AlertUI config={{ description: "No se preveen lluvias" }} />
         </Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 9 }}>
            <SelectorUI /> {/* Usa SelectorUI aquí */}
         </Grid>

         {/* Indicadores */}
         <Grid>Elemento: Indicadores</Grid>

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