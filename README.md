# Client-Side Trust / Parameter Tampering — Minijuego educativo

Este minijuego demuestra una vulnerabilidad común: Client-Side Trust / Parameter Tampering, cuando una aplicación confía en datos controlados por el cliente sin validarlos correctamente en el servidor.

## ¿Qué es Client-Side Trust y Parameter Tampering?

Si el servidor asume que los datos enviados por el cliente (formularios, parámetros POST, cabeceras) son honestos o están protegidos por la lógica del frontend, un atacante puede modificar esas peticiones y enviar valores que la aplicación nunca debería aceptar. El frontend no es una defensa: todo lo que se envía puede alterarse (DevTools, curl, Burp, etc.).

## Descripción técnica

El frontend no es un límite de seguridad.
Cualquier dato enviado por el cliente (parámetros, JSON, POST, headers) puede ser modificado mediante herramientas como DevTools, curl o Burp.

Cuando el servidor:

asume que esos valores son legítimos

o replica lógica crítica del frontend

se abre la puerta a parameter tampering: manipular parámetros para forzar estados imposibles, bypass de controles o respuestas privilegiadas.

Este reto explota exactamente ese fallo.

## Objetivo del reto

El participante debe:

Analizar el comportamiento de la aplicación

Identificar qué parámetro controla la lógica sensible

Manipular la petición enviada al servidor

Forzar una respuesta que nunca debería producirse

Obtener la flag

No hay validaciones server-side.
No hay protección real.
Ese es el fallo.

## Notas importantes

Esto no es un videojuego

No hay puntuaciones reales

No hay ranking

No hay estado compartido

Nada se guarda

Cada ejecución es independiente.
El único objetivo es explotar la confianza indebida en el cliente.

## Estructura del proyecto

index.html — Interfaz del reto (canvas y lógica visual).

style.css — Estilos.

game.js — Lógica del cliente y envío de parámetros.

server.py — Backend mínimo para ejecutar el reto en local.

## Cómo ejecutar
python server.py


## Abrir en el navegador:

http://localhost:8765/


También es posible abrir index.html directamente, pero para resolver el reto completo es necesario un backend que procese la petición manipulada.

## Requisitos

Python 3

Navegador moderno

Conocimientos básicos de HTTP y manipulación de peticiones
