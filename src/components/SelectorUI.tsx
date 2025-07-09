import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select'; // Importa solo el tipo
import MenuItem from '@mui/material/MenuItem';

interface SelectorUIProps {
   cityInput: string;
   setCityInput: (value: string) => void;
}

export default function SelectorUI({cityInput, setCityInput}: SelectorUIProps) {
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
            <MenuItem value={"Guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"Quito"}>Quito</MenuItem>
            <MenuItem value={"Manta"}>Manta</MenuItem>
            <MenuItem value={"Cuenca"}>Cuenca</MenuItem>
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