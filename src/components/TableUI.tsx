import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      Fecha: label,
      Temperatura: arrValues1[index],
      Velocidad_del_viento: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'Fecha',
      headerName: 'Fecha',
      width: 150,
   },
   {
      field: 'Temperatura',
      headerName: 'Temperatura',
      width: 150,
   },
   {
      field: 'Velocidad_del_viento',
      headerName: 'Velocidad del viento',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 160,
      valueGetter: (_, row) => `${row.Fecha || ''} ${row.Temperatura || ''} ${row.Velocidad_del_viento || ''}`,
   },
];

interface TableUIProps {
  arrLabels: string[];
  arrValues1: number[];
  arrValues2: number[];
}


export default function TableUI({ arrLabels, arrValues1, arrValues2 }: TableUIProps) {

   const rows = combineArrays(arrLabels, arrValues1, arrValues2);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}
