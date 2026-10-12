/**
 * skillsRegistry.js — Static Matching, Consolidation & Classification Table.
 *
 * Maps raw technologies and tools found across PROJECTS_DATA to canonical
 * portfolio skills, categorizing each into:
 * - 'programming'   -> Programming Languages
 * - 'technologies'  -> Technologies & Frameworks (flagship consolidated stacks)
 * - 'tools'         -> Tools & Environment (consolidated toolchains & platforms)
 * - 'ignore'        -> Trivial utilities filtered out from display (pip, ZIP, etc.)
 */

export const SKILLS_REGISTRY = {
  // ─────────────────────────────────────────────────────────────
  // 1. PROGRAMMING LANGUAGES ('programming')
  // ─────────────────────────────────────────────────────────────
  'C++': {
    category: 'programming',
    name: 'C++',
    badge: 'C++17 / C++20',
    level: 'Advanced',
    priority: 1,
    detail: 'Modern C++17/20, STL, memory management, SIMD (AVX2), double-precision coordinate systems, custom engine architecture.',
  },
  'Python': {
    category: 'programming',
    name: 'Python',
    badge: 'Advanced',
    level: 'Advanced',
    priority: 2,
    detail: 'Algorithmic simulations, heuristic routing, FastAPI microservices, data parsing, automation utilities.',
  },
  'C': {
    category: 'programming',
    name: 'C',
    badge: 'Low-Level Systems',
    level: 'Proficient',
    priority: 3,
    detail: 'Pointers, dynamic memory allocation, POSIX system calls, hardware-level architecture comprehension.',
  },
  'Go': {
    category: 'programming',
    name: 'Go (Golang)',
    badge: 'Distributed Systems',
    level: 'Proficient',
    priority: 4,
    detail: 'High-concurrency servers, goroutines, channels, REST APIs, networked backend services.',
  },
  'TypeScript': {
    category: 'programming',
    name: 'TypeScript & JavaScript',
    badge: 'Strict Typing / ES6+',
    level: 'Proficient',
    priority: 5,
    label: 'TypeScript',
    detail: 'Strict static typing, complex interface modeling, generic types, async architectures, robust frontend engineering.',
  },
  'JavaScript': {
    aliasOf: 'TypeScript',
    label: 'JavaScript',
  },
  'Java': {
    category: 'programming',
    name: 'Java',
    badge: 'Concurrency / TCP',
    level: 'Proficient',
    priority: 6,
    detail: 'Multi-threaded servers, socket programming, synchronizers, time-series data handling.',
  },
  'Haskell': {
    category: 'programming',
    name: 'Haskell',
    badge: 'Functional Programming',
    level: 'Proficient',
    priority: 7,
    detail: 'Pure functional programming, monads, immutable game state modeling, type classes.',
  },

  // ─────────────────────────────────────────────────────────────
  // 2. TECHNOLOGIES & FRAMEWORKS ('technologies')
  // Flagship consolidated engineering stacks
  // ─────────────────────────────────────────────────────────────
  'OpenGL 2': {
    category: 'technologies',
    name: 'OpenGL 3.3+ & 3D Graphics',
    badge: 'Graphics API',
    level: 'Advanced',
    priority: 1,
    label: 'OpenGL 3.3+',
    detail: 'Modern C++ graphics pipeline, shaders, mathematical transforms (GLM), windowing (GLFW), and real-time debugging tools.',
  },
  'GLFW': { aliasOf: 'OpenGL 2', label: 'GLFW' },
  'GLEW': { aliasOf: 'OpenGL 2', label: 'GLEW' },
  'GLM': { aliasOf: 'OpenGL 2', label: 'GLM' },
  'ImGui': { aliasOf: 'OpenGL 2', label: 'Dear ImGui' },
  'stb': { aliasOf: 'OpenGL 2', label: 'stb_image' },
  'tinyxml2': { aliasOf: 'OpenGL 2', label: 'tinyxml2' },
  'rapidcsv': { aliasOf: 'OpenGL 2', label: 'rapidcsv' },

  'NumPy': {
    category: 'technologies',
    name: 'PyData & Machine Learning Stack',
    badge: 'Scientific & ML',
    level: 'Advanced',
    priority: 2,
    label: 'NumPy',
    detail: 'Vectorized multidimensional array computation, DataFrame analytics, spatial KD-trees, regression, and gradient boosting algorithms.',
  },
  'Pandas': { aliasOf: 'NumPy', label: 'Pandas' },
  'SciPy': { aliasOf: 'NumPy', label: 'SciPy' },
  'scikit-learn': { aliasOf: 'NumPy', label: 'scikit-learn' },
  'XGBoost': { aliasOf: 'NumPy', label: 'XGBoost' },
  'Matplotlib': { aliasOf: 'NumPy', label: 'Matplotlib' },

  'OSMnx': {
    category: 'technologies',
    name: 'Geospatial & Road Networks (OSMnx)',
    badge: 'Spatial Analytics',
    level: 'Advanced',
    priority: 3,
    label: 'OSMnx',
    detail: 'Extracting, analyzing, and visualizing street networks from OpenStreetMap as graph structures, spatial joins, coordinate reference systems.',
  },
  'GeoPandas': { aliasOf: 'OSMnx', label: 'GeoPandas' },
  'NetworkX': { aliasOf: 'OSMnx', label: 'NetworkX' },

  'FastAPI': {
    category: 'technologies',
    name: 'FastAPI & Python Backend Ecosystem',
    badge: 'Async Microservices',
    level: 'Proficient',
    priority: 4,
    label: 'FastAPI',
    detail: 'High-throughput asynchronous APIs, OpenAPI contract validation, SQLModel ORM, Pydantic schema validation, and web scraping.',
  },
  'Flask': { aliasOf: 'FastAPI', label: 'Flask' },
  'SQLModel': { aliasOf: 'FastAPI', label: 'SQLModel' },
  'Pydantic': { aliasOf: 'FastAPI', label: 'Pydantic' },
  'Uvicorn': { aliasOf: 'FastAPI', label: 'Uvicorn' },
  'requests': { aliasOf: 'FastAPI', label: 'requests' },
  'BeautifulSoup4': { aliasOf: 'FastAPI', label: 'BeautifulSoup4' },
  'Jinja2': { aliasOf: 'FastAPI', label: 'Jinja2' },

  'Ollama': {
    category: 'technologies',
    name: 'LLM Security & Local Inference',
    badge: 'AI Security & LLMs',
    level: 'Proficient',
    priority: 5,
    label: 'Ollama',
    detail: 'Local model inference with Ollama, prompt injection vulnerability auditing against OWASP LLM01, adversarial evaluation frameworks.',
  },
  'OpenAI API': { aliasOf: 'Ollama', label: 'OpenAI API' },
  'OWASP LLM01': { aliasOf: 'Ollama', label: 'OWASP LLM01' },
  'MITRE ATLAS': { aliasOf: 'Ollama', label: 'MITRE ATLAS' },
  'PyYAML': { aliasOf: 'Ollama', label: 'PyYAML' },

  'React': {
    category: 'technologies',
    name: 'React & Web Frontend Ecosystem',
    badge: 'Frontend Web Stack',
    level: 'Proficient',
    priority: 6,
    label: 'React',
    detail: 'Component-driven web applications, server-side rendering, responsive design tokens, and stateful client-side routing.',
  },
  'React 18': { aliasOf: 'React', label: 'React 18' },
  'React DOM': { aliasOf: 'React', label: 'React DOM' },
  'Next.js 14': { aliasOf: 'React', label: 'Next.js 14' },
  'Tailwind CSS': { aliasOf: 'React', label: 'Tailwind CSS' },
  'Headless UI': { aliasOf: 'React', label: 'Headless UI' },
  'Heroicons': { aliasOf: 'React', label: 'Heroicons' },
  'Axios': { aliasOf: 'React', label: 'Axios' },
  'Framer Motion': { aliasOf: 'React', label: 'Framer Motion' },
  'Socket.IO': { aliasOf: 'React', label: 'Socket.IO' },
  'HTML': { aliasOf: 'React', label: 'HTML5' },
  'CSS': { aliasOf: 'React', label: 'CSS3' },

  'React Native': {
    category: 'technologies',
    name: 'React Native & Mobile Development',
    badge: 'Mobile Apps',
    level: 'Proficient',
    priority: 7,
    label: 'React Native',
    detail: 'Cross-platform mobile apps for iOS and Android, device camera integration, barcode scanning, context-aware chatbot UI.',
  },
  'Expo': { aliasOf: 'React Native', label: 'Expo' },

  'PySide6': {
    category: 'technologies',
    name: 'Desktop GUI Engineering (Qt & Tkinter)',
    badge: 'Desktop Applications',
    level: 'Proficient',
    priority: 8,
    label: 'PySide6 (Qt)',
    detail: 'Cross-platform native desktop tool development, custom viewport rendering, sprite manipulation, and event loops.',
  },
  'Tkinter': { aliasOf: 'PySide6', label: 'Tkinter' },
  'Pillow': { aliasOf: 'PySide6', label: 'Pillow' },

  'sounddevice': {
    category: 'technologies',
    name: 'Audio Signal Processing',
    badge: 'Audio Engineering',
    level: 'Proficient',
    priority: 9,
    label: 'sounddevice',
    detail: 'Real-time microphone audio capture, waveform visualization, non-destructive editing, volume normalization, and audio codecs.',
  },
  'soundfile': { aliasOf: 'sounddevice', label: 'soundfile' },
  'pydub': { aliasOf: 'sounddevice', label: 'pydub' },

  'SQLite': {
    category: 'technologies',
    name: 'SQLite',
    badge: 'Embedded Database',
    level: 'Proficient',
    priority: 10,
    detail: 'Embedded relational database storage, offline indexing, lightweight query optimization.',
  },

  'GLib': {
    category: 'technologies',
    name: 'GLib (C Systems Library)',
    badge: 'Low-Level Systems',
    level: 'Proficient',
    priority: 11,
    detail: 'Data structures, thread abstractions, memory slices, event loops in C.',
  },

  'PLY (Lex/Yacc)': {
    category: 'technologies',
    name: 'Compiler Engineering (PLY & AST)',
    badge: 'Compiler Design',
    level: 'Proficient',
    priority: 12,
    label: 'PLY (Lex/Yacc)',
    detail: 'Lexical analysis, LALR(1) parsing grammar specifications, AST construction, and language benchmarking.',
  },
  'ANTLR grammar': { aliasOf: 'PLY (Lex/Yacc)', label: 'ANTLR' },

  'Gloss': {
    category: 'technologies',
    name: 'Gloss (Haskell 2D Graphics)',
    badge: 'Functional Graphics',
    level: 'Proficient',
    priority: 13,
    detail: 'Pure functional 2D vector graphics, interactive viewport transformations, and animation loop in Haskell.',
  },

  // ─────────────────────────────────────────────────────────────
  // 3. TOOLS & ENVIRONMENT ('tools')
  // Consolidated toolchains, build systems & testing suites
  // ─────────────────────────────────────────────────────────────
  'POSIX/Linux': {
    category: 'tools',
    name: 'Linux / POSIX',
    badge: 'Daily Driver / OS',
    level: 'Advanced',
    priority: 1,
    detail: 'Linux environment power user, Bash scripting, process management, POSIX toolchains.',
  },

  'Git': {
    category: 'tools',
    name: 'Git & GitHub Actions',
    badge: 'Version Control & CI/CD',
    level: 'Advanced',
    priority: 2,
    label: 'Git',
    detail: 'Branching hygiene, interactive rebasing, automated continuous integration, testing, and deployment pipelines.',
  },
  'GitHub': { aliasOf: 'Git', label: 'GitHub' },
  'GitHub Actions': { aliasOf: 'Git', label: 'GitHub Actions' },
  'GitHub Pages': { aliasOf: 'Git', label: 'GitHub Pages' },

  'CMake': {
    category: 'tools',
    name: 'CMake & Build Systems',
    badge: 'C/C++ Build Systems',
    level: 'Proficient',
    priority: 3,
    label: 'CMake',
    detail: 'Modular cross-platform build scripts, third-party dependency fetching, compilation target configurations, and Makefile pipelines.',
  },
  'GNU Make': { aliasOf: 'CMake', label: 'GNU Make' },
  'vcpkg': { aliasOf: 'CMake', label: 'vcpkg' },

  'GCC': {
    category: 'tools',
    name: 'GCC & Clang Compilers',
    badge: 'C/C++ Toolchains',
    level: 'Proficient',
    priority: 4,
    label: 'GCC',
    detail: 'GNU Compiler Collection, compiler optimization flags, warnings hygiene, compilation diagnostics, and automated code formatting.',
  },
  'GCC/Clang/MSBuild': { aliasOf: 'GCC', label: 'Clang / MSBuild' },
  'clang-format': { aliasOf: 'GCC', label: 'clang-format' },

  'Pytest': {
    category: 'tools',
    name: 'Automated Testing & QA Suites',
    badge: 'TDD & QA',
    level: 'Proficient',
    priority: 5,
    label: 'Pytest',
    detail: 'Test-Driven Development (TDD), end-to-end headless browser testing, unit assertions, mock test harnesses, determinism verification.',
  },
  'Playwright': { aliasOf: 'Pytest', label: 'Playwright' },
  'JUnit': { aliasOf: 'Pytest', label: 'JUnit' },
  'HUnit': { aliasOf: 'Pytest', label: 'HUnit' },
  'Doctest': { aliasOf: 'Pytest', label: 'Doctest' },
  'pytest/tests directory': { aliasOf: 'Pytest', label: 'Pytest' },
  'unittest': { aliasOf: 'Pytest', label: 'unittest' },

  'TCP': {
    category: 'tools',
    name: 'TCP Sockets & Network Protocols',
    badge: 'Network Protocols',
    level: 'Proficient',
    priority: 6,
    label: 'TCP Sockets',
    detail: 'Binary framed protocols, socket streams, connection demultiplexing, network communication, REST API contracts.',
  },
  'REST API': { aliasOf: 'TCP', label: 'REST APIs' },
  'REST APIs': { aliasOf: 'TCP', label: 'REST APIs' },

  'CoreEMU': {
    category: 'tools',
    name: 'CoreEMU',
    badge: 'Network Emulator',
    level: 'Proficient',
    priority: 7,
    detail: 'Common Open Research Emulator for virtual network topology experiments under simulated constraints.',
  },

  'OpenStreetMap': {
    category: 'tools',
    name: 'OpenStreetMap Platform',
    badge: 'Geospatial Data',
    level: 'Proficient',
    priority: 8,
    label: 'OpenStreetMap',
    detail: 'Overpass API querying, spatial nodes and road data extraction for city-scale routing.',
  },
  'Maps': { aliasOf: 'OpenStreetMap', label: 'Maps / Overpass' },

  'Gradle': {
    category: 'tools',
    name: 'Gradle',
    badge: 'Java Build Tool',
    level: 'Proficient',
    priority: 9,
    label: 'Gradle',
    detail: 'Automated dependency resolution, build lifecycles, workload execution scripts.',
  },
  'Kotlin DSL': { aliasOf: 'Gradle', label: 'Kotlin DSL' },

  'Cabal': {
    category: 'tools',
    name: 'GHC & Cabal (Haskell Toolchain)',
    badge: 'Haskell Toolchain',
    level: 'Proficient',
    priority: 10,
    label: 'Cabal',
    detail: 'Glasgow Haskell Compiler, Cabal package management, and Haddock documentation generation.',
  },
  'GHCi': { aliasOf: 'Cabal', label: 'GHC / GHCi' },
  'Haddock': { aliasOf: 'Cabal', label: 'Haddock' },

  'Vite': {
    category: 'tools',
    name: 'Modern Web & Python Tooling',
    badge: 'Dev Tooling & Linting',
    level: 'Proficient',
    priority: 11,
    label: 'Vite',
    detail: 'Modern frontend bundler, ESLint static analysis, code formatters, and rapid package management.',
  },
  'ESLint': { aliasOf: 'Vite', label: 'ESLint' },
  'PostCSS': { aliasOf: 'Vite', label: 'PostCSS' },
  'Prettier': { aliasOf: 'Vite', label: 'Prettier' },
  'Husky': { aliasOf: 'Vite', label: 'Husky' },
  'Netlify': { aliasOf: 'Vite', label: 'Netlify' },
  'Black': { aliasOf: 'Vite', label: 'Black' },
  'uv': { aliasOf: 'Vite', label: 'uv' },

  // ─────────────────────────────────────────────────────────────
  // 4. IGNORED TRIVIAL ITEMS ('ignore')
  // Low-signal, standard utility packages or document tags
  // ─────────────────────────────────────────────────────────────
  'pip': { category: 'ignore' },
  'npm': { category: 'ignore' },
  'asdf': { category: 'ignore' },
  'JSON': { category: 'ignore' },
  'ZIP': { category: 'ignore' },
  'OGG': { category: 'ignore' },
  'Windows audio devices': { category: 'ignore' },
  'Minecraft Java Edition': { category: 'ignore' },
  'Tests': { category: 'ignore' },
  'Benchmark scripts': { category: 'ignore' },
  'Architecture documentation': { category: 'ignore' },
  'LLM-assisted development workflow': { category: 'ignore' },
  'Browser ES modules': { category: 'ignore' },
  'LocalStorage': { category: 'ignore' },
  'Async Storage': { category: 'ignore' },
  'Java networking': { category: 'ignore' },
  'Local LLM inference': { category: 'ignore' },
  'random': { category: 'ignore' },
  'SimpleBar React': { category: 'ignore' },
  '@fontsource/share-tech-mono': { category: 'ignore' },
  'Typst': { category: 'ignore' },
  'PowerShell': { category: 'ignore' },
  'XML': { category: 'ignore' },
  'YAML': { category: 'ignore' },
  'CurseForge': { category: 'ignore' },
  'Figma': { category: 'ignore' },
  'JFreeChart': { category: 'ignore' },
  'Python standard library': { category: 'ignore' },
};
