# Client-Side Trust / Parameter Tampering — Minijuego educativo

Este minijuego está diseñado para aprender y practicar **Client-Side Trust** y **Parameter Tampering**: cuando la aplicación confía en datos que vienen del cliente (puntuación, parámetros en la petición) sin validarlos correctamente en el servidor.

## ¿Qué es Client-Side Trust y Parameter Tampering?

Si el servidor asume que los datos enviados por el cliente (formularios, parámetros POST, cabeceras) son honestos o están protegidos por la lógica del frontend, un atacante puede modificar esas peticiones y enviar valores que la aplicación nunca debería aceptar. El frontend no es una defensa: todo lo que se envía puede alterarse (DevTools, curl, Burp, etc.).

**Parameter tampering** es explotar eso: manipular parámetros para bypassear comprobaciones, desbloquear funcionalidad o forzar respuestas que solo deberían darse en condiciones “imposibles”.

## Objetivo del reto

En este minijuego debes:

- **Analizar** cómo se comporta la aplicación y qué envía al servidor
- **Entender** qué parámetro controla la lógica sensible
- **Manipular** la petición (parámetro, formato, valor) sin tocar el “juego”
- **Forzar** una respuesta que la app no debería dar si confiara solo en el cliente
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
3. Analiza, manipula la petición y consigue la flag.

También puedes abrir `index.html` directamente (file://), pero para que el reto funcione necesitas el servidor o integrar los archivos en tu propio backend.

## Requisitos

- Python 3
- Navegador moderno

Sin sesiones, sin base de datos: todo el reto está en confiar en lo que envía el cliente.
