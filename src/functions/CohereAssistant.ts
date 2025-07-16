import axios from 'axios';

const COHERE_API_URL = 'https://api.cohere.ai/v1/chat';
const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY; // Usa VITE_ para variables de entorno en Vite
const MAX_CALLS_PER_MINUTE = 10;

let callCount = 0;
let lastReset = Date.now();

function resetCallCount() {
  const now = Date.now();
  if (now - lastReset > 60000) {
    callCount = 0;
    lastReset = now;
  }
}

export async function askCohere(message: string, weatherParams: any) {
  resetCallCount();
  if (callCount >= MAX_CALLS_PER_MINUTE) {
    throw new Error('Límite de consultas alcanzado. Intenta más tarde.');
  }
  callCount++;

  try {
    const response = await axios.post(
      COHERE_API_URL,
      {
        message,
        chat_history: [
          { user_name: "usuario", text: message },
          { user_name: "sistema", text: `Datos actuales del clima: ${JSON.stringify(weatherParams)}` }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.data && response.data.text) {
      return response.data.text;
    } else {
      throw new Error('Respuesta inesperada de Cohere.');
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Error Cohere: ${error.response.data.message || error.response.statusText}`);
    }
    throw new Error('Error de red o desconocido al contactar Cohere.');
  }
}