#!/usr/bin/env python3
"""
Minimal optional backend for the Client-Side Trust / Parameter Tampering mini-game.
Serves static files and, on POST with body 'data' (Base64 score), returns
the game page with window.SHOW_FLAG set when decoded score > 10000.

Usage: python server.py
Then open http://localhost:8765/

No auth, no DB, no session. Challenge: don't trust client-supplied parameters.
"""

import base64
import http.server
import os
import urllib.parse

PORT = 8765
THRESHOLD = 10000
FLAG = os.environ.get('FLAG_CACHE', 'flag{client_side_hackong}')


def get_decoded_score(data_param):
    if not data_param:
        return None
    try:
        decoded = base64.b64decode(data_param).decode('utf-8', errors='ignore').strip()
        return int(decoded)
    except Exception:
        return None


def inject_flag_script(html_content, flag):
    # Inyectar al inicio del body para que SHOW_FLAG exista cuando se ejecute el script del final
    script = '<script>window.SHOW_FLAG = ' + repr(flag) + ';</script>\n'
    return html_content.replace('<body>', '<body>\n' + script)


class GameHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def do_GET(self):
        if self.path in ('/', '/index.html'):
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path in ('/', '/index.html'):
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length).decode('utf-8', errors='ignore')
            params = urllib.parse.parse_qs(body)
            data_param = (params.get('data') or [None])[0]
            score = get_decoded_score(data_param)
            show_flag = score is not None and score > THRESHOLD

            self.path = '/index.html'
            with open(os.path.join(self.directory, 'index.html'), 'r', encoding='utf-8') as f:
                content = f.read()
            if show_flag:
                content = inject_flag_script(content, FLAG)

            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', len(content.encode('utf-8')))
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
            return
        self.send_response(404)
        self.end_headers()


if __name__ == '__main__':
    with http.server.HTTPServer(('', PORT), GameHandler) as httpd:
        print('Mini-game: http://localhost:{}/'.format(PORT))
        httpd.serve_forever()
