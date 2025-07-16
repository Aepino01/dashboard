import { useState } from 'react';
import { askCohere } from '../functions/CohereAssistant';
import { Button, TextField, Typography, Box } from '@mui/material';

interface Props {
  weatherData: any;
}

export default function CohereAssistant({ weatherData }: Props) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await askCohere(input, weatherData);
      setResponse(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6">Asistente del clima</Typography>
      <TextField
        label="Pregunta sobre el clima"
        value={input}
        onChange={e => setInput(e.target.value)}
        fullWidth
        size="small"
        sx={{ my: 1 }}
      />
      <Button onClick={handleAsk} disabled={loading || !input} variant="contained">
        Preguntar
      </Button>
      {loading && <Typography>Cargando respuesta...</Typography>}
      {response && <Typography sx={{ mt: 1 }}>{response}</Typography>}
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
    </Box>
  );
}