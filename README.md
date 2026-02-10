# Web Cache Poisoning — Minijuego educativo

Este minijuego está diseñado para aprender y practicar **Web Cache Poisoning**, una vulnerabilidad en la que un atacante consigue que un servidor o proxy cachee una respuesta maliciosa y la sirva posteriormente a otros usuarios.

## ¿Qué es Web Cache Poisoning?

Las cachés (CDN, proxies, Nginx, etc.) almacenan respuestas para evitar recalcularlas en cada petición. Si la clave de caché depende únicamente de la URL (o de cabeceras controlables por el usuario), un atacante puede provocar que se cachee una respuesta manipulada.

Una vez cacheada, esa respuesta "envenenada" puede ser servida a otros usuarios que accedan a la misma URL, causando exposición de datos, bypass de controles o ejecución de lógica inesperada.

## Objetivo del reto

En este minijuego debes:

- **Analizar** cómo se comporta la aplicación
- **Entender** qué se cachea y cómo
- **Manipular** una variable controlada por el cliente
- **Forzar** una respuesta que nunca debería existir
- **Obtener** la flag

**No es un videojuego con progreso:** es un reto CTF. No hay puntuaciones guardadas, ni ranking ni estado entre jugadores; todo es efímero y local. El único objetivo es explotar la vulnerabilidad.

## Contenido del proyecto

- **index.html** — Página del reto (canvas, envío de puntuación).
- **style.css** — Estilos.
- **game.js** — Lógica y envío al servidor.
- **server.py** — Servidor para correr el reto en local.

## Cómo jugar

1. Ejecuta el servidor:
   ```bash
   python server.py
   ```
2. Abre en el navegador: **http://localhost:8765/**
3. Analiza, manipula y consigue la flag.

También puedes abrir `index.html` directamente (file://), pero para que el reto funcione necesitas el servidor o integrar los archivos en tu propio backend.

## Requisitos

- Python 3
- Navegador moderno

Sin sesiones, sin base de datos: todo el reto está en la vulnerabilidad.
