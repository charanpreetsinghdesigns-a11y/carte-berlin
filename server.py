#!/usr/bin/env python3
"""
Tiny static file server for local development.

Usage:
    python3 server.py              # serves on http://localhost:8090
    PORT=3000 python3 server.py    # custom port

Serves the directory this script lives in. `/` resolves to `index.html`.
"""
import os
import sys
import http.server
import socketserver
import mimetypes

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)


class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Quiet by default; comment out to see request logs.
        pass

    def do_HEAD(self):
        self._serve(head_only=True)

    def do_GET(self):
        self._serve(head_only=False)

    def _serve(self, head_only=False):
        path = self.path.split('?')[0]
        if path in ('', '/'):
            path = '/index.html'
        if '..' in path:
            self.send_response(403)
            self.end_headers()
            return

        fp = os.path.join(ROOT, path.lstrip('/'))
        if os.path.isdir(fp):
            fp = os.path.join(fp, 'index.html')
        if not os.path.isfile(fp):
            self.send_response(404)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            if not head_only:
                self.wfile.write(b'Not Found: ' + path.encode('utf-8'))
            return

        try:
            with open(fp, 'rb') as f:
                data = f.read()
        except OSError:
            self.send_response(500)
            self.end_headers()
            return

        ctype = mimetypes.guess_type(fp)[0] or 'application/octet-stream'
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        if not head_only:
            self.wfile.write(data)


def main():
    port = int(os.environ.get('PORT', 8090))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', port), Handler) as srv:
        print(f'Loop → http://localhost:{port}/', flush=True)
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            print('\nStopped.', flush=True)


if __name__ == '__main__':
    main()
