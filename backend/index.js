const express = require('express');
const cors = require('cors');
const ytdlp = require('yt-dlp-exec');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url, format } = req.body;

  try {
    // Definir formato de salida
    const outputFormat = format === 'mp4' ? 'mp4' : 'mp3';
    const tempAudioFile = 'temp_audio.m4a'; // Archivo temporal en m4a
    const outputFile = `output.${outputFormat}`;

    // Usar yt-dlp para descargar el audio en formato m4a
    const ytdlpOptions = {
      format: 'bestaudio[ext=m4a]',
      output: tempAudioFile,
      postprocessorArgs: ['-vn'], // Solo audio
    };

    await ytdlp(url, ytdlpOptions); // Esperamos que la descarga se complete

    if (outputFormat === 'mp3') {
      // Si el formato de salida es mp3, usamos ffmpeg para convertir
      const ffmpegCommand = `ffmpeg -i ${tempAudioFile} -acodec libmp3lame -ar 44100 -ac 2 -ab 192k ${outputFile}`;
      exec(ffmpegCommand, (err, stdout, stderr) => {
        if (err) {
          console.error('Error al convertir el audio:', err);
          return res.status(500).json({ error: 'Error al convertir el archivo de audio.' });
        }

        // Enviar archivo convertido al cliente
        res.download(outputFile, (downloadErr) => {
          if (downloadErr) {
            console.error(downloadErr);
            return res.status(500).json({ error: 'Error al enviar el archivo.' });
          } else {
            // Eliminar archivos temporales después de enviar
            fs.unlinkSync(outputFile);
            fs.unlinkSync(tempAudioFile);
          }
        });
      });
    } else {
      // Si el formato es mp4 o cualquier otro, simplemente enviamos el archivo descargado
      res.download(tempAudioFile, (downloadErr) => {
        if (downloadErr) {
          console.error(downloadErr);
          return res.status(500).json({ error: 'Error al enviar el archivo.' });
        } else {
          // Eliminar archivos temporales después de enviar
          fs.unlinkSync(tempAudioFile);
        }
      });
    }

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: error.message || 'Error al procesar la solicitud.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
