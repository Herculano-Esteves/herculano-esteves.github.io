#!/usr/bin/env python3
import os
import sys
import shutil
import platform
import subprocess
import urllib.request
import zipfile
import tarfile

PROJECT_DIR = os.path.abspath(os.path.dirname(__file__))
PORTABLE_DIR = os.path.join(PROJECT_DIR, ".node")
NODE_VERSION = "v22.5.1"

def download_progress(block_num, block_size, total_size):
    read_so_far = block_num * block_size
    if total_size > 0:
        percent = min(100.0, (read_so_far * 100.0) / total_size)
        sys.stdout.write(f"\r Descarregando Node.js: {percent:.1f}%")
        sys.stdout.flush()
    else:
        sys.stdout.write(f"\r Descarregando Node.js: {read_so_far} bytes")
        sys.stdout.flush()

def get_linux_arch():
    machine = platform.machine().lower()
    if machine in ("x86_64", "amd64"):
        return "x64"
    elif machine in ("aarch64", "arm64"):
        return "arm64"
    elif "armv7" in machine or "armhf" in machine:
        return "armv7l"
    return "x64"

def get_darwin_arch():
    machine = platform.machine().lower()
    if machine in ("aarch64", "arm64"):
        return "arm64"
    return "x64"

def get_portable_target():
    os_name = sys.platform
    if os_name.startswith("win"):
        dir_name = f"node-{NODE_VERSION}-win-x64"
        archive_name = f"{dir_name}.zip"
        bin_dir = os.path.join(PORTABLE_DIR, dir_name)
        node_bin = os.path.join(bin_dir, "node.exe")
        npm_bin = os.path.join(bin_dir, "npm.cmd")
        is_zip = True
    elif os_name.startswith("linux"):
        arch = get_linux_arch()
        dir_name = f"node-{NODE_VERSION}-linux-{arch}"
        archive_name = f"{dir_name}.tar.gz"
        bin_dir = os.path.join(PORTABLE_DIR, dir_name, "bin")
        node_bin = os.path.join(bin_dir, "node")
        npm_bin = os.path.join(bin_dir, "npm")
        is_zip = False
    elif os_name.startswith("darwin"):
        arch = get_darwin_arch()
        dir_name = f"node-{NODE_VERSION}-darwin-{arch}"
        archive_name = f"{dir_name}.tar.gz"
        bin_dir = os.path.join(PORTABLE_DIR, dir_name, "bin")
        node_bin = os.path.join(bin_dir, "node")
        npm_bin = os.path.join(bin_dir, "npm")
        is_zip = False
    else:
        raise OSError(f"Sistema operativo nao suportado para versao portatil: {os_name}")

    url = f"https://nodejs.org/dist/{NODE_VERSION}/{archive_name}"
    return {
        "dir_name": dir_name,
        "archive_name": archive_name,
        "url": url,
        "bin_dir": bin_dir,
        "node_bin": node_bin,
        "npm_bin": npm_bin,
        "is_zip": is_zip,
    }

def setup_portable_node():
    target = get_portable_target()
    bin_dir = target["bin_dir"]
    node_bin = target["node_bin"]
    npm_bin = target["npm_bin"]

    # Check if already downloaded and extracted
    if not (os.path.exists(node_bin) and os.path.exists(npm_bin)):
        print("==================================================")
        print("      Herculano Esteves - Setup Node.js Local     ")
        print("==================================================")
        print(" Node.js local nao encontrado.")
        print(f" A descarregar a versao portatil ({NODE_VERSION})...")
        print("==================================================")

        os.makedirs(PORTABLE_DIR, exist_ok=True)
        archive_path = os.path.join(PORTABLE_DIR, target["archive_name"])

        try:
            urllib.request.urlretrieve(target["url"], archive_path, download_progress)
            print("\n\n Download concluido! A extrair ficheiros...")

            if target["is_zip"]:
                with zipfile.ZipFile(archive_path, 'r') as zip_ref:
                    zip_ref.extractall(PORTABLE_DIR)
            else:
                with tarfile.open(archive_path, "r:gz") as tar_ref:
                    if hasattr(tarfile, 'data_filter'):
                        tar_ref.extractall(PORTABLE_DIR, filter='tar')
                    else:
                        tar_ref.extractall(PORTABLE_DIR)

            print(" Extracao concluida!")
        except Exception as e:
            print(f"\n Erro durante a configuracao do Node.js: {e}")
            if os.path.exists(archive_path):
                os.remove(archive_path)
            sys.exit(1)
        finally:
            if os.path.exists(archive_path):
                try:
                    os.remove(archive_path)
                except OSError:
                    pass

    # Ensure executable permissions on Unix systems
    if not sys.platform.startswith("win"):
        for binary in (node_bin, npm_bin):
            if os.path.exists(binary):
                try:
                    st = os.stat(binary)
                    os.chmod(binary, st.st_mode | 0o755)
                except OSError:
                    pass

    # CRITICAL: Always prepend portable bin_dir to PATH for current and child processes
    bin_dir_abs = os.path.abspath(bin_dir)
    current_paths = [os.path.abspath(p) for p in os.environ.get("PATH", "").split(os.pathsep) if p]
    if bin_dir_abs not in current_paths:
        os.environ["PATH"] = bin_dir_abs + os.pathsep + os.environ.get("PATH", "")

    return npm_bin

def get_npm_executable():
    # 1. Prefer system node and npm if both are present
    system_node = shutil.which("node")
    system_npm = shutil.which("npm")
    if system_node and system_npm:
        return system_npm

    # 2. Fallback to portable Node.js for Windows/Linux/macOS
    try:
        return setup_portable_node()
    except Exception as e:
        print("==================================================")
        print(f" Erro ao configurar Node.js portatil: {e}")
        print(" Por favor instale o Node.js no seu sistema.")
        print(" Exemplo no Ubuntu/Debian: sudo apt update && sudo apt install nodejs npm")
        print(" Exemplo no Arch: sudo pacman -S nodejs npm")
        print(" Exemplo no Fedora: sudo dnf install nodejs npm")
        print("==================================================")
        sys.exit(1)

def ensure_dependencies(npm_bin):
    node_modules_path = os.path.join(PROJECT_DIR, "node_modules")
    if not os.path.exists(node_modules_path):
        print("==================================================")
        print(" Instalando dependencias (npm install)...")
        print("==================================================")
        try:
            subprocess.run([npm_bin, "install"], check=True, cwd=PROJECT_DIR, env=os.environ.copy())
        except Exception as e:
            print(f"\n Erro ao instalar dependencias: {e}")
            sys.exit(1)

def run_server():
    npm_bin = get_npm_executable()
    ensure_dependencies(npm_bin)

    print("==================================================")
    print("      Herculano Esteves - Local React Server      ")
    print("==================================================")
    print(" Executando 'npm run dev' para o Vite...")
    print("==================================================")

    try:
        subprocess.run([npm_bin, "run", "dev"], check=True, cwd=PROJECT_DIR, env=os.environ.copy())
    except KeyboardInterrupt:
        print("\nServidor encerrado. Ate a proxima!")
        sys.exit(0)
    except Exception as e:
        print(f"\nErro ao iniciar o servidor Vite: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
