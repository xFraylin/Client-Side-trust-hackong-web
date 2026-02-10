# Web Cache Poisoning — Minijuego educativo

Minijuego para aprender **Web Cache Poisoning**: una vulnerabilidad en la que un atacante consigue que un servidor o proxy cachee una respuesta maliciosa y la sirva a otros usuarios.

## ¿Qué es Web Cache Poisoning?

Las cachés (CDN, proxies, Nginx, etc.) guardan respuestas para no tener que generarlas cada vez. Si la clave de caché depende solo de la URL (o de cabeceras que el atacante controla), un atacante puede hacer una petición que provoque una respuesta “envenenada” (con contenido malicioso o sensible). Esa respuesta queda cacheada y se sirve después a otras víctimas que pidan la misma URL.

En este juego tienes que entender cómo se comporta la aplicación, qué se cachea y cómo explotarlo para obtener la flag. No hay pistas aquí: es un reto.

## Contenido del proyecto

- **index.html** — Página del juego (canvas, envío de puntuación).
- **style.css** — Estilos.
- **game.js** — Lógica del juego y envío de puntuación al servidor.
- **server.py** — Servidor opcional para jugar en local.

## Cómo jugar

1. Ejecuta el servidor:
   ```bash
   python server.py
   ```
2. Abre en el navegador: **http://localhost:8765/**
3. Juega y explora. El objetivo es conseguir la flag aplicando los conceptos de cache poisoning.

También puedes abrir `index.html` directamente (file://), pero para que el reto funcione necesitas el servidor o integrar los archivos en tu propio backend.

## Requisitos

- Python 3.
- Navegador moderno.

Sin sesiones, sin base de datos: todo el reto está en entender la vulnerabilidad.
