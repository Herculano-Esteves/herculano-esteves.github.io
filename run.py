#!/usr/bin/env python3
import os
import sys
import subprocess
import urllib.request
import zipfile

# Node.js portable Windows version settings
NODE_VERSION = "v22.5.1"
NODE_DIR_NAME = f"node-{NODE_VERSION}-win-x64"
NODE_ZIP_URL = f"https://nodejs.org/dist/{NODE_VERSION}/{NODE_DIR_NAME}.zip"

PROJECT_DIR = os.path.abspath(os.path.dirname(__file__))
PORTABLE_DIR = os.path.join(PROJECT_DIR, ".node")
NODE_EXTRACTED_DIR = os.path.join(PORTABLE_DIR, NODE_DIR_NAME)
NODE_EXE = os.path.join(NODE_EXTRACTED_DIR, "node.exe")
NPM_CMD = os.path.join(NODE_EXTRACTED_DIR, "npm.cmd")

def download_progress(block_num, block_size, total_size):
    read_so_far = block_num * block_size
    if total_size > 0:
        percent = min(100, (read_so_far * 100) / total_size)
        sys.stdout.write(f"\r Descarregando Node.js: {percent:.1f}%")
        sys.stdout.flush()
    else:
        sys.stdout.write(f"\r Descarregando Node.js: {read_so_far} bytes")
        sys.stdout.flush()

def ensure_portable_node():
    if os.path.exists(NODE_EXE) and os.path.exists(NPM_CMD):
        return

    print("==================================================")
    print("      Herculano Esteves - Setup Node.js Local     ")
    print("==================================================")
    print(" Node.js local nao encontrado.")
    print(f" A descarregar a versao portatil ({NODE_VERSION})...")
    print("==================================================")

    os.makedirs(PORTABLE_DIR, exist_ok=True)
    zip_path = os.path.join(PORTABLE_DIR, f"node-{NODE_VERSION}.zip")

    try:
        # Download the zip file
        urllib.request.urlretrieve(NODE_ZIP_URL, zip_path, download_progress)
        print("\n\n Download concluido! A extrair ficheiros...")

        # Extract the zip file
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(PORTABLE_DIR)
        
        print(" Extracao concluida!")
    except Exception as e:
        print(f"\n Erro durante a configuracao do Node.js: {e}")
        if os.path.exists(zip_path):
            os.remove(zip_path)
        sys.exit(1)
    finally:
        # Clean up the zip file
        if os.path.exists(zip_path):
            os.remove(zip_path)

def ensure_dependencies():
    node_modules_path = os.path.join(PROJECT_DIR, "node_modules")
    if not os.path.exists(node_modules_path):
        print("==================================================")
        print(" Instalando dependencias (npm install)...")
        print("==================================================")
        try:
            # Run npm install using our portable npm
            subprocess.run([NPM_CMD, "install"], check=True, cwd=PROJECT_DIR)
        except Exception as e:
            print(f"\n Erro ao instalar dependencias: {e}")
            sys.exit(1)

def run_server():
    # Prepend the portable Node.js folder to PATH so subprocesses can resolve 'node'
    os.environ["PATH"] = NODE_EXTRACTED_DIR + os.pathsep + os.environ.get("PATH", "")

    # Ensure Node.js and dependencies are ready
    ensure_portable_node()
    ensure_dependencies()

    print("==================================================")
    print("      Herculano Esteves - Local React Server      ")
    print("==================================================")
    print(" Executando 'npm run dev' para o Vite...")
    print("==================================================")

    try:
        subprocess.run([NPM_CMD, "run", "dev"], check=True, cwd=PROJECT_DIR)
    except KeyboardInterrupt:
        print("\nServidor encerrado. Ate a proxima!")
        sys.exit(0)
    except Exception as e:
        print(f"\nErro ao iniciar o servidor Vite: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
