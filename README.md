# UR-tube Downloader

UR-tube Downloader es una aplicación web que permite descargar videos de YouTube en diferentes formatos de manera fácil y rápida. Puedes elegir entre descargar solo el audio o el video completo.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecutando el Proyecto](#ejecutando-el-proyecto)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- Node.js (v14 o superior)
- npm o yarn
- FFmpeg (para convertir audio a MP3, si es necesario)

Si no tienes FFmpeg instalado, puedes instalarlo desde su sitio oficial o usando un gestor de paquetes como `brew` en macOS o `apt` en Linux.

## Instalación

### 1. Clona el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/ur-tube-downloader.git
cd ur-tube-downloader
2. Instalar dependencias
Para instalar las dependencias necesarias para el backend y frontend, ejecuta los siguientes comandos dentro de la carpeta del proyecto:

Backend (Servidor Express):
Abre una terminal en el directorio del proyecto y navega a la carpeta del servidor backend y ejecuta:

bash
Copiar código
cd backend
npm install
Frontend (Aplicación React):
En la misma terminal, ve a la carpeta del frontend y ejecuta:

bash
Copiar código
cd frontend
npm install
## Ejecutando el Proyecto
1. Iniciar el Backend (Servidor Express)
Desde la carpeta backend, ejecuta el siguiente comando para iniciar el servidor de Express:

bash
Copiar código
npm start
Esto iniciará el servidor en el puerto 5000. Asegúrate de que el backend esté corriendo antes de continuar.

2. Iniciar el Frontend (Aplicación React)
Desde la carpeta frontend, ejecuta el siguiente comando para iniciar la aplicación React:

bash
Copiar código
npm start
Esto abrirá tu navegador predeterminado y accederás a la interfaz de la aplicación en http://localhost:3000.

## Uso de la Aplicación
Ingresa la URL del video: Copia la URL del video de YouTube (o de otro sitio compatible) que deseas descargar.
Selecciona el formato: Elige si deseas descargar el video en formato MP3 o MP4.
Descargar: Haz clic en el botón "Download" para comenzar la descarga del archivo. El archivo se descargará automáticamente una vez procesado.
Notas Importantes:
El formato de descarga puede ser configurado entre MP3 (solo audio) y MP4 (video completo).
Si eliges MP3, la aplicación usará FFmpeg para convertir el audio a este formato después de descargar el archivo en un formato intermedio.
Asegúrate de que FFmpeg esté instalado y configurado correctamente en tu sistema para evitar errores en la conversión.
## Estructura del Proyecto
El proyecto está dividido en dos partes principales:

bash
Copiar código
/ur-tube-downloader
|-- /backend               # Servidor Express
|   |-- index.js           # Configuración y lógica del servidor
|   |-- /node_modules      # Dependencias de backend
|   |-- package.json       # Dependencias de backend
|-- /frontend              # Aplicación React
|   |-- /src
|   |-- /node_modules      # Dependencias de frontend
|   |-- package.json       # Dependencias de frontend
|-- README.md             # Este archivo
## Contribución
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios.
Haz un commit (git commit -am 'Agrega nueva funcionalidad').
Envía tus cambios a tu repositorio (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.
## Licencia
Este proyecto está bajo la licencia MIT - consulta el archivo LICENSE para más detalles.





