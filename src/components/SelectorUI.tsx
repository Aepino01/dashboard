import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select'; // Importa solo el tipo
import MenuItem from '@mui/material/MenuItem';

export default function SelectorUI() {
   const [cityInput, setCityInput] = useState<string>('');

   const handleChange = (event: SelectChangeEvent<string>) => {
      setCityInput(event.target.value);
   };

   const capitalize = (text: string) =>
      text.charAt(0).toUpperCase() + text.slice(1);

   return (
      <FormControl fullWidth>
         <InputLabel id="city-select-label">Ciudad</InputLabel>
         <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            value={cityInput}
            onChange={handleChange}
         >
            <MenuItem disabled value="">
               <em>Seleccione una ciudad</em>
            </MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>
         </Select>
         {cityInput && (
            <p>
               Información del clima en{' '}
               <b>{capitalize(cityInput)}</b>
            </p>
         )}
      </FormControl>
   )
}