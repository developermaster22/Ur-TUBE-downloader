import React, { useState } from 'react';
import './App.css'; // Estilos para la interfaz

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    if (!url) {
      setMessage('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    setMessage('');
    setFileUrl('');
    setProgress(0);

    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, format }),
      });

      if (response.ok) {
        const data = await response.blob();
        const downloadLink = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = `download.${format}`;
        a.click();
        setMessage('Download started successfully.');
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error downloading the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">UR-tube Downloader</h1>
        <div className="input-container">
          <label htmlFor="url-input" className="label">Enter video URL:</label>
          <input
            id="url-input"
            type="text"
            placeholder="Enter video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="select-container">
          <label htmlFor="format-select" className="label">Choose format:</label>
          <select
            id="format-select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="select-field"
          >
            <option value="mp3">MP3</option>
            <option value="mp4">MP4</option>
          </select>
        </div>
        <div className="button-container">
          <button
            onClick={handleDownload}
            disabled={loading}
            className={`download-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Downloading...' : 'Download'}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
        {loading && <progress value={progress} max={100} />}
      </div>
    </div>
  );
}

export default App;
