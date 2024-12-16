import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (url, format) => {
    setIsDownloading(true); // Inicia el proceso de descarga
    try {
      const response = await axios.post('http://localhost:5000/download', { url, format }, {
        responseType: 'blob', // Esto indica que estamos esperando una respuesta binaria (como un archivo)
      });

      // Aquí puedes manejar la respuesta para descargar el archivo
      const blob = response.data;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = format === 'mp3' ? 'audio.mp3' : 'video.mp4';
      link.click();
      setIsDownloading(false); // Termina el proceso de descarga
    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Error al descargar el archivo. Intenta de nuevo.');
      setIsDownloading(false); // Termina el proceso de descarga incluso si hay error
    }
  };

  return (
    <div>
      <h1>UR-TUBE DOWNLOADER</h1>
      <div>
        <label>URL: </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Introduce la URL del video"
        />
      </div>
      <div>
        <label>Formato: </label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="mp3">MP3</option>
          <option value="mp4">MP4</option>
        </select>
      </div>
      <button
        onClick={() => handleDownload(url, format)}
        disabled={isDownloading || !url}
      >
        {isDownloading ? 'Descargando...' : 'Descargar'}
      </button>
    </div>
  );
};

export default App;
