# Web Cache Poisoning — Mini-game (standalone)

Minijuego educativo independiente para demostrar **Web Cache Poisoning**. Sin dependencias del portal principal: sin sesión, sin auth, sin base de datos.

## Contenido

- **index.html** — Página del juego (canvas, puntuaciones falsas, popup de flag).
- **style.css** — Estilos autocontenidos.
- **game.js** — Lógica del juego y envío de puntuación (POST con `data` en Base64).
- **server.py** — Servidor opcional: sirve los estáticos y, en POST, si `data` (Base64) decodifica a un número > 10000, devuelve la misma página inyectando `window.SHOW_FLAG` para mostrar la flag en un popup.

## Uso solo estático

Abre `index.html` en el navegador (file://). El botón "Enviar puntuación" hará POST a la misma URL; sin backend no verás la flag (útil para integrar en tu propio servidor).

## Uso con servidor incluido

```bash
python server.py
```

Abre http://localhost:8765/  
Juega, pierde, pulsa "Enviar puntuación". Si quieres ver la flag sin jugar: envía un POST a http://localhost:8765/ con `data=MTAwMDE=` (Base64 de 10001) y se mostrará la flag en la respuesta.

Variable de entorno opcional: `FLAG_CACHE` (por defecto `flag{cache_poisoning}`).

## Integración en otra app

1. Copia la carpeta (o solo `index.html`, `style.css`, `game.js`).
2. Sirve los estáticos en la ruta que quieras (ej. `/game`).
3. En esa misma ruta, acepta POST con body `data=<Base64(score)>`. Si `int(decoded) > 10000`, responde con el HTML del juego inyectando `window.SHOW_FLAG = 'tu_flag';` antes de `</body>`.
4. Para el reto de cache poisoning: configura tu proxy/caché (ej. Nginx) para cachear por URI; así una respuesta “envenenada” con la flag puede servirse a otras víctimas.

No hay sesión, auth ni base de datos; el juego es autocontenido.
