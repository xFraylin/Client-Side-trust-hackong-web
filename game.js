/**
 * Standalone Seguridad Arcade — game logic.
 * Submits score as Base64 in POST body (key: data) to current URL.
 * Configure submitUrl if the form should POST elsewhere.
 */
(function() {
    'use strict';

    var submitUrl = ''; // empty = same page (e.g. when served by optional server.py)

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var gameStart = document.getElementById('gameStart');
    var gameOver = document.getElementById('gameOver');
    var btnStart = document.getElementById('btnStart');
    var btnSubmitScore = document.getElementById('btnSubmitScore');
    var finalScoreEl = document.getElementById('finalScore');
    var btnRetry = document.getElementById('btnRetry');

    if (btnRetry) btnRetry.href = window.location.pathname || '/';

    function toBase64(num) {
        return btoa(String(num));
    }

    var GAME_WIDTH = 400;
    var GAME_HEIGHT = 480;
    var PLAYER_WIDTH = 60;
    var PLAYER_HEIGHT = 16;
    var PLAYER_Y = GAME_HEIGHT - 32;
    var FALL_SPEED = 2.2;
    var SPAWN_INTERVAL = 900;
    var BOMB_RATIO = 0.45;
    var AUTO_SCORE_INTERVAL = 350;
    var COIN_POINTS = 3;

    var playerX = (GAME_WIDTH - PLAYER_WIDTH) / 2;
    var score = 0;
    var running = false;
    var objects = [];
    var lastSpawn = 0;
    var lastAutoScore = 0;
    var animId = 0;
    var mouseX = playerX;

    canvas.addEventListener('mousemove', function(e) {
        var rect = canvas.getBoundingClientRect();
        var scale = GAME_WIDTH / rect.width;
        mouseX = (e.clientX - rect.left) * scale - PLAYER_WIDTH / 2;
    });

    function clamp(x, a, b) {
        return Math.max(a, Math.min(b, x));
    }

    function spawnObject() {
        var isBomb = Math.random() < BOMB_RATIO;
        objects.push({
            x: Math.random() * (GAME_WIDTH - 24),
            y: -24,
            w: 24,
            h: 24,
            isBomb: isBomb
        });
    }

    function gameOverNow() {
        if (!running) return;
        running = false;
        cancelAnimationFrame(animId);
        finalScoreEl.textContent = score;
        gameOver.classList.remove('hidden');
    }

    function submitScore() {
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = submitUrl || window.location.pathname || '';
        if (!form.action) form.action = window.location.href;
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'data';
        input.value = toBase64(score);
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    }

    btnStart.addEventListener('click', function() {
        gameStart.classList.add('hidden');
        gameOver.classList.add('hidden');
        score = 0;
        objects = [];
        running = true;
        lastSpawn = 0;
        lastAutoScore = Date.now();
        loop();
    });

    if (btnSubmitScore) btnSubmitScore.addEventListener('click', submitScore);

    var popup = document.getElementById('flagPopup');
    var btnClose = document.getElementById('btnClosePopup');
    if (btnClose && popup) {
        btnClose.addEventListener('click', function() {
            popup.classList.add('hidden');
        });
    }

    function loop() {
        if (!running) return;
        var now = Date.now();

        if (now - lastSpawn > SPAWN_INTERVAL) {
            spawnObject();
            lastSpawn = now;
        }
        if (now - lastAutoScore > AUTO_SCORE_INTERVAL) {
            score += 2;
            lastAutoScore = now;
        }

        playerX = clamp(mouseX, 0, GAME_WIDTH - PLAYER_WIDTH);

        ctx.fillStyle = '#0f1419';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.fillStyle = '#22d3ee';
        ctx.fillRect(playerX, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT);

        for (var i = objects.length - 1; i >= 0; i--) {
            var o = objects[i];
            o.y += FALL_SPEED;

            if (o.y > GAME_HEIGHT) {
                objects.splice(i, 1);
                continue;
            }

            var hit = o.y + o.h >= PLAYER_Y && o.y <= PLAYER_Y + PLAYER_HEIGHT &&
                o.x + o.w >= playerX && o.x <= playerX + PLAYER_WIDTH;

            if (hit) {
                if (o.isBomb) {
                    gameOverNow();
                    return;
                }
                score += COIN_POINTS;
                objects.splice(i, 1);
                continue;
            }

            ctx.fillStyle = o.isBomb ? '#f87171' : '#4ade80';
            ctx.fillRect(o.x, o.y, o.w, o.h);
        }

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('Puntos: ' + score, 12, 28);

        animId = requestAnimationFrame(loop);
    }
})();
