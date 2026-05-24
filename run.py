#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import sys
import socket

PORT = 8000

def get_free_port(start_port):
    port = start_port
    while port < 65535:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("", port))
                return port
            except OSError:
                port += 1
    return start_port

def run_server():
    port = get_free_port(PORT)
    Handler = http.server.SimpleHTTPRequestHandler

    print("==================================================")
    print("      Herculano Esteves - Local Web Server        ")
    print("==================================================")
    print(f" Servindo ficheiros em: http://localhost:{port}")
    print(" Pressione Ctrl+C para encerrar o servidor.")
    print("==================================================")

    # Open the browser in a new tab
    try:
        webbrowser.open(f"http://localhost:{port}")
    except Exception as e:
        print(f"Não foi possível abrir o navegador automaticamente: {e}")

    # Start the server
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServidor encerrado. Até à próxima!")
        sys.exit(0)
    except Exception as e:
        print(f"\nErro ao iniciar o servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
