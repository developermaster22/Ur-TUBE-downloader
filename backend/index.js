const ytdl = require('ytdl-core');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Para permitir solicitudes CORS
app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON

// Ruta para descargar video o audio
app.post('/download', (req, res) => {
  const { url, format } = req.body; // Destructuración de URL y formato del cuerpo de la solicitud
  
  if (!url) {
    return res.status(400).json({ error: 'URL no proporcionada' }); // Si no hay URL, responder con un error
  }

  // Decidir si se descarga audio (mp3) o video (mp4) basado en el formato
  const audioFormat = format === 'mp3';

  // Si es audio, descarga solo el audio
  const stream = audioFormat
    ? ytdl(url, { filter: 'audioonly', quality: 'highestaudio' })
    : ytdl(url, { quality: 'highestvideo' }); // Si no es mp3, descarga el video
  
  // Establecer las cabeceras de la respuesta dependiendo del tipo de archivo
  res.setHeader('Content-Type', audioFormat ? 'audio/mpeg' : 'video/mp4');
  res.setHeader('Content-Disposition', `attachment; filename="${audioFormat ? 'audio.mp3' : 'video.mp4'}"`);

  // Enviar el stream de datos al cliente
  stream.pipe(res);

  // Manejador de error del stream
  stream.on('error', (err) => {
    console.error('Error durante la descarga:', err);
    res.status(500).json({ error: 'Error al descargar el archivo' });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
