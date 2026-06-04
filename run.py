#!/usr/bin/env python3
import subprocess
import sys


def run_server():
    print("==================================================")
    print("      Herculano Esteves - Local React Server      ")
    print("==================================================")
    print(" Executando 'npm run dev' para o Vite...")
    print("==================================================")

    try:
        subprocess.run(["npm", "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\nServidor encerrado. Até à próxima!")
        sys.exit(0)
    except Exception as e:
        print(f"\nErro ao iniciar o servidor Vite: {e}")
        print("Certifique-se de que correu 'npm install' primeiro.")
        sys.exit(1)

if __name__ == "__main__":
    run_server()



