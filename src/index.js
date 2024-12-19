import React from 'react';
import ReactDOM from 'react-dom/client'; // Importación desde 'react-dom/client' en React 18+
import App from './App'; // Importación del componente principal de la aplicación

// Verificar que el contenedor con id 'root' esté disponible
const rootElement = document.getElementById('root');

if (rootElement) {
  // Crear el root para renderizar la aplicación
  const root = ReactDOM.createRoot(rootElement);
  
  // Renderizar la aplicación React
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('No se encontró el contenedor "root" en el DOM.');
}
