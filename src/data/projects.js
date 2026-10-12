// Images for Exam Preparation
import examSubjectImg from '../../assets/projects/exam_preparation/subjectchoosing.webp';
import examChoosingImg from '../../assets/projects/exam_preparation/examchoosing.webp';
import examQuestionImg from '../../assets/projects/exam_preparation/question.webp';

// Images for Fleet Simulator
import fleetMenuImg from '../../assets/projects/fleet_simulator/simulation_menu.webp';
import fleetTrafficImg from '../../assets/projects/fleet_simulator/traffic.webp';

// Images for Flight Companion (Mobile app, portrait screenshots)
import flightMenuImg from '../../assets/projects/flight_companion/menu.webp';
import flightPlanImg from '../../assets/projects/flight_companion/plan_trip.webp';
import flightTicketImg from '../../assets/projects/flight_companion/ticket.webp';
import flightVideoThumb from '../../assets/projects/flight_companion/video_thumbnail.webp';

// Images for Entity Editor
import entityMenuImg from '../../assets/projects/entity_editor/editor_menu.webp';
import entityTextureImg from '../../assets/projects/entity_editor/texture_Manager.webp';
import entityUvImg from '../../assets/projects/entity_editor/uv_edditor.webp';

export const PROJECTS_DATA = [
  // ── 0. AI-25-26 ──
  {
    name: "AI-25-26",
    title: "Fleet Simulator",
    description: "Comprehensive fleet simulation comparing electric and combustion vehicle operations on real urban geospatial road networks. Optimizes urban dispatching, route planning, traffic conditions, hotspot demands, weather states, and charging-station queues.",
    images: [fleetMenuImg, fleetTrafficImg],
    layout: 'side-by-side',
    aspectRatio: 'landscape',
    link: "https://github.com/Herculano-Esteves/AI-25-26",
    techStack: {
      languages: ["Python"],
      frameworks: ["Tkinter", "OSMnx", "NetworkX", "NumPy", "Pandas", "GeoPandas", "Matplotlib", "SciPy", "scikit-learn"],
      tools: ["OpenStreetMap", "pip", "Black"]
    },
    items: [
      "Python",
      "Tkinter",
      "OSMnx",
      "NetworkX",
      "NumPy",
      "Pandas",
      "GeoPandas",
      "Matplotlib",
      "SciPy",
      "scikit-learn",
      "OpenStreetMap",
      "pip",
      "Black"
    ],
    tags: ["Python", "OSMnx", "GeoPandas", "Tkinter", "OpenStreetMap"]
  },

  // ── 1. entityEditor ──
  {
    name: "entityEditor",
    title: "Entity Editor",
    description: "Modular 2D character and entity editor built for custom game engines. Features interactive 2D pan/zoom viewport with snapping, sprite transforms, layer ordering, UV region mapping, typed collision hitboxes, and custom .entdef serialization.",
    images: [entityMenuImg, entityTextureImg, entityUvImg],
    layout: 'carousel',
    aspectRatio: 'landscape',
    link: "https://github.com/Herculano-Esteves/entityEditor",
    techStack: {
      languages: ["Python"],
      frameworks: ["PySide6", "Pillow"],
      tools: ["pip", "pytest/tests directory"]
    },
    items: [
      "Python",
      "PySide6",
      "Pillow",
      "pip",
      "pytest/tests directory"
    ],
    tags: ["Python", "PySide6", "Pillow", "pytest", "Game Dev Tool"]
  },

  // ── 2. examPreparation ──
  {
    name: "examPreparation",
    title: "Exam Preparation Platform",
    description: "Browser-based exam practice and authoring platform with zero application backend dependencies. Features full mock exams, targeted practice, bilingual PT/EN interface, local analytics, JSON/ZIP import-export, and automated browser tests.",
    images: [examSubjectImg, examChoosingImg, examQuestionImg],
    layout: 'carousel',
    aspectRatio: 'landscape',
    link: "https://herculano-esteves.github.io/examPreparation/",
    techStack: {
      languages: ["JavaScript", "HTML", "CSS", "Python"],
      frameworks: ["Browser ES modules", "LocalStorage", "Playwright", "Pytest", "unittest"],
      tools: ["GitHub Pages", "JSON", "ZIP", "Python standard library"]
    },
    items: [
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Browser ES modules",
      "LocalStorage",
      "Playwright",
      "Pytest",
      "unittest",
      "GitHub Pages",
      "JSON",
      "ZIP",
      "Python standard library"
    ],
    tags: ["JavaScript", "Python", "Playwright", "LocalStorage", "GitHub Pages"]
  },

  // ── 3. Flight_Companion ──
  {
    name: "Flight_Companion",
    title: "Flight Companion",
    description: "48-hour hackathon mobile travel assistant offering boarding-pass barcode scanning, flight information tracking, local persistence, destination itineraries, and a context-aware travel chatbot.",
    images: [flightMenuImg, flightPlanImg, flightTicketImg],
    layout: 'three-columns',
    aspectRatio: 'portrait',
    videoUrl: "https://www.youtube.com/watch?v=pTjHLOc0qTQ",
    videoThumbnail: flightVideoThumb,
    link: "https://github.com/Herculano-Esteves/Flight_Companion",
    techStack: {
      languages: ["Python", "TypeScript", "Go"],
      frameworks: ["React Native", "Expo", "FastAPI", "SQLite", "Pandas", "NumPy", "BeautifulSoup4", "Pytest", "Async Storage"],
      tools: ["Git", "REST APIs", "Maps"]
    },
    items: [
      "Python",
      "TypeScript",
      "Go",
      "React Native",
      "Expo",
      "FastAPI",
      "SQLite",
      "Pandas",
      "NumPy",
      "BeautifulSoup4",
      "Pytest",
      "Async Storage",
      "Git",
      "REST APIs",
      "Maps"
    ],
    tags: ["React Native", "FastAPI", "Go", "Expo", "TypeScript"]
  },

  // ── 4. herculano-esteves.github.io ──
  {
    name: "herculano-esteves.github.io",
    title: "Portfolio",
    hidden: true,
    description: "Interactive terminal-inspired personal portfolio featuring a responsive character-cell layout, CRT scanline and RGB mask simulation, animated typing decryption, centralized design tokens, and automated deployment with GitHub Actions.",
    link: "https://github.com/Herculano-Esteves/herculano-esteves.github.io",
    techStack: {
      languages: ["JavaScript", "HTML", "CSS"],
      frameworks: ["React", "React DOM", "SimpleBar React", "Vite", "@fontsource/share-tech-mono"],
      tools: ["npm", "ESLint", "GitHub Actions", "GitHub Pages"]
    },
    items: [
      "JavaScript",
      "HTML",
      "CSS",
      "React",
      "React DOM",
      "SimpleBar React",
      "Vite",
      "@fontsource/share-tech-mono",
      "npm",
      "ESLint",
      "GitHub Actions",
      "GitHub Pages"
    ],
    tags: ["React", "Vite", "JavaScript", "GitHub Actions", "CSS"]
  },

  // ── 5. LI2 ──
  {
    name: "LI2",
    title: "LI2 — Card Game in C",
    hidden: true,
    description: "University card-game project developed in C using GCC and GNU Make, applying procedural decomposition, game-state rule modeling, and manual memory management.",
    link: "https://github.com/Herculano-Esteves/LI2",
    techStack: {
      languages: ["C"],
      frameworks: [],
      tools: ["GCC", "GNU Make", "Git"]
    },
    items: [
      "C",
      "GCC",
      "GNU Make",
      "Git"
    ],
    tags: ["C", "GCC", "GNU Make", "Procedural Programming"]
  },

  // ── 6. LI3 ──
  {
    name: "LI3",
    title: "LI3 — Team Software Project",
    hidden: true,
    description: "Collaborative software engineering team project for Universidade do Minho Laboratórios de Informática III, focusing on modular systems architecture, procedural logic in C, and collaborative fork workflow.",
    link: "https://github.com/Herculano-Esteves/LI3",
    techStack: {
      languages: ["C"],
      frameworks: [],
      tools: ["Git", "GitHub"]
    },
    items: [
      "C",
      "Git",
      "GitHub"
    ],
    tags: ["C", "Team Development", "Git", "Modular Architecture"]
  },

  // ── 7. LI4 ──
  {
    name: "LI4",
    title: "LI4 — AI-Assisted Development Methodology",
    hidden: true,
    description: "University software engineering project exploring human-in-the-loop AI-assisted software design, testing roadmaps, modular architecture planning, and technical documentation with Typst.",
    link: "https://github.com/Herculano-Esteves/LI4",
    techStack: {
      languages: ["Typst"],
      frameworks: [],
      tools: ["Git", "Architecture documentation", "LLM-assisted development workflow"]
    },
    items: [
      "Typst",
      "Git",
      "Architecture documentation",
      "LLM-assisted development workflow"
    ],
    tags: ["Typst", "Software Architecture", "AI Methodology", "Documentation"]
  },

  // ── 8. MessedUpMario ──
  {
    name: "MessedUpMario",
    title: "MessedUpMario (Primate Kong)",
    hidden: true,
    description: "Interactive graphical game and level editor in Haskell using Gloss. Features functional game-state modeling, interactive menus, customizable level editor module, and automated unit tests with HUnit.",
    link: "https://github.com/Herculano-Esteves/MessedUpMario",
    techStack: {
      languages: ["Haskell"],
      frameworks: ["Gloss", "random", "HUnit"],
      tools: ["Cabal", "GHCi", "Haddock", "Doctest"]
    },
    items: [
      "Haskell",
      "Gloss",
      "random",
      "HUnit",
      "Cabal",
      "GHCi",
      "Haddock",
      "Doctest"
    ],
    tags: ["Haskell", "Gloss", "Cabal", "HUnit", "Functional Programming"]
  },

  // ── 9. MinecraftSoundResourcePack ──
  {
    name: "MinecraftSoundResourcePack",
    title: "Minecraft Sound Resource Pack Editor",
    hidden: true,
    description: "Windows GUI tool in Python for creating Minecraft voice and sound resource packs. Features microphone recording, real-time waveform visualization, volume normalization, asset extraction, and one-click pack export.",
    link: "https://github.com/Herculano-Esteves/MinecraftSoundResourcePack",
    techStack: {
      languages: ["Python", "JSON"],
      frameworks: ["sounddevice", "soundfile", "pydub", "NumPy"],
      tools: ["Windows audio devices", "Minecraft Java Edition", "CurseForge", "OGG"]
    },
    items: [
      "Python",
      "JSON",
      "sounddevice",
      "soundfile",
      "pydub",
      "NumPy",
      "Windows audio devices",
      "Minecraft Java Edition",
      "CurseForge",
      "OGG"
    ],
    tags: ["Python", "sounddevice", "NumPy", "Audio Processing", "GUI"]
  },

  // ── 10. PL_UniWork ──
  {
    name: "PL_UniWork",
    title: "Fortran-like Compiler",
    hidden: true,
    description: "Compiler for a simplified Fortran-like programming language implemented in Python using PLY (Lex/Yacc). Features lexical tokenization, grammar-based parsing, Abstract Syntax Tree (AST) modeling, and benchmark suites.",
    link: "https://github.com/Herculano-Esteves/PL_UniWork",
    techStack: {
      languages: ["Python", "ANTLR grammar"],
      frameworks: ["PLY (Lex/Yacc)"],
      tools: ["pip", "Benchmark scripts", "Tests"]
    },
    items: [
      "Python",
      "ANTLR grammar",
      "PLY (Lex/Yacc)",
      "pip",
      "Benchmark scripts",
      "Tests"
    ],
    tags: ["Python", "Compilers", "PLY (Lex/Yacc)", "AST", "Parsing"]
  },

  // ── 11. SD_Uni ──
  {
    name: "SD_Uni",
    title: "Distributed Sales Database (SD_Uni)",
    hidden: true,
    description: "Java client-server time-series sales database for distributed systems coursework. Features sharded concurrency handling, framed binary TCP protocol, user authentication, and performance workload benchmarks.",
    link: "https://github.com/Herculano-Esteves/SD_Uni",
    techStack: {
      languages: ["Java", "Kotlin DSL"],
      frameworks: ["Java networking", "JUnit", "JFreeChart"],
      tools: ["Gradle", "TCP", "asdf"]
    },
    items: [
      "Java",
      "Kotlin DSL",
      "Java networking",
      "JUnit",
      "JFreeChart",
      "Gradle",
      "TCP",
      "asdf"
    ],
    tags: ["Java", "TCP", "Concurrency", "Distributed Systems", "Gradle"]
  },

  // ── SO_Uni ──
  {
    name: "SO_Uni",
    title: "Operating Systems Client/Server (SO_Uni)",
    hidden: true,
    description: "Operating systems university client/server project in C. Features FIFO-based interprocess communication (IPC), shared file management, execution caching, and process coordination.",
    link: "https://github.com/Herculano-Esteves/SO_Uni",
    techStack: {
      languages: ["C"],
      frameworks: ["GLib"],
      tools: ["GCC", "GNU Make", "clang-format", "POSIX/Linux"]
    },
    items: [
      "C",
      "GLib",
      "GCC",
      "GNU Make",
      "clang-format",
      "POSIX/Linux"
    ],
    tags: ["C", "POSIX/Linux", "IPC", "GNU Make", "GLib"]
  },

  // ── 14. Swiper_Products ──
  {
    name: "Swiper_Products",
    title: "Swiper Products",
    hidden: true,
    description: "Hackathon application for product discovery and recommendation. Combines React, React Native, FastAPI, SQLModel, image/price parsing, and AI-assisted pricing workflows with XGBoost.",
    link: "https://github.com/Herculano-Esteves/Swiper_Products",
    techStack: {
      languages: ["Python", "JavaScript"],
      frameworks: ["React", "React Native", "FastAPI", "Uvicorn", "SQLModel", "Pandas", "Pydantic", "XGBoost", "OpenAI API"],
      tools: ["npm", "pip", "REST API"]
    },
    items: [
      "Python",
      "JavaScript",
      "React",
      "React Native",
      "FastAPI",
      "Uvicorn",
      "SQLModel",
      "Pandas",
      "Pydantic",
      "XGBoost",
      "OpenAI API",
      "npm",
      "pip",
      "REST API"
    ],
    tags: ["React Native", "FastAPI", "SQLModel", "XGBoost", "Python"]
  },

  // ── Security-AI ──
  {
    name: "Security-AI",
    title: "Security-AI Evaluation Framework",
    hidden: true,
    description: "Collaborative Python security evaluation framework for detecting and testing prompt injection and LLM vulnerabilities against OWASP LLM01 and MITRE ATLAS catalogs using Ollama, Pydantic, and automated sandbox runners.",
    link: "https://github.com/Brito-MP/Security-AI",
    techStack: {
      languages: ["Python", "YAML"],
      frameworks: ["Ollama", "Pydantic", "PyYAML", "Pytest", "requests"],
      tools: ["PowerShell", "Local LLM inference", "OWASP LLM01", "MITRE ATLAS"]
    },
    items: [
      "Python",
      "YAML",
      "Ollama",
      "Pydantic",
      "PyYAML",
      "Pytest",
      "requests",
      "PowerShell",
      "Local LLM inference",
      "OWASP LLM01",
      "MITRE ATLAS"
    ],
    tags: ["Python", "Ollama", "Pydantic", "AI Security", "Pytest"]
  },

  // ── 17. astrolink ──
  {
    name: "astrolink",
    title: "AstroLink Network Simulation",
    hidden: true,
    description: "Spacecraft, rover and ground-station network simulation framework built for CoreEMU. Experiments with communication protocols, mission topologies, and message exchange under simulated network constraints.",
    link: "https://github.com/nunom27/astrolink",
    techStack: {
      languages: ["Python"],
      frameworks: ["Flask", "Jinja2", "requests"],
      tools: ["CoreEMU", "uv", "pip"]
    },
    items: [
      "Python",
      "Flask",
      "Jinja2",
      "requests",
      "CoreEMU",
      "uv",
      "pip"
    ],
    tags: ["Python", "CoreEMU", "Flask", "Networking", "Protocols"]
  },

  // ── 18. CG ──
  {
    name: "CG",
    title: "OpenGL 3D Graphics Engine (CG)",
    hidden: true,
    description: "C++ OpenGL graphics engine supporting XML-defined scenes, procedural 3D geometry generation, solar-system planetary orbit simulations, Bézier surfaces, and ImGui real-time controls.",
    link: "https://github.com/nunom27/CG",
    techStack: {
      languages: ["C++", "XML"],
      frameworks: ["OpenGL 2", "GLFW", "GLEW", "GLM", "tinyxml2", "ImGui", "stb", "rapidcsv"],
      tools: ["CMake", "vcpkg", "GCC/Clang/MSBuild"]
    },
    items: [
      "C++",
      "XML",
      "OpenGL 2",
      "GLFW",
      "GLEW",
      "GLM",
      "tinyxml2",
      "ImGui",
      "stb",
      "rapidcsv",
      "CMake",
      "vcpkg",
      "GCC/Clang/MSBuild"
    ],
    tags: ["C++", "OpenGL", "GLM", "CMake", "ImGui"]
  },

  // ── 19. crypture ──
  {
    name: "crypture",
    title: "Crypture Web Platform",
    hidden: true,
    description: "Full-stack web application built with Next.js 14 and React 18, featuring TypeScript, Tailwind CSS, Headless UI, Axios, and modular component architecture.",
    link: "https://github.com/nunom27/crypture",
    techStack: {
      languages: ["TypeScript", "JavaScript"],
      frameworks: ["Next.js 14", "React 18", "Tailwind CSS", "Headless UI", "Axios", "Heroicons"],
      tools: ["npm", "ESLint", "PostCSS"]
    },
    items: [
      "TypeScript",
      "JavaScript",
      "Next.js 14",
      "React 18",
      "Tailwind CSS",
      "Headless UI",
      "Axios",
      "Heroicons",
      "npm",
      "ESLint",
      "PostCSS"
    ],
    tags: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Axios"]
  },

  // ── 20. SD ──
  {
    name: "SD",
    title: "SD — Team Distributed Sales Database (Upstream)",
    hidden: true,
    description: "Original team repository of the Java distributed sales database. Contributed framed TCP connection and request demultiplexing, database changes, file-manager improvements, and benchmark workloads.",
    link: "https://github.com/nunom27/SD",
    techStack: {
      languages: ["Java", "Kotlin DSL"],
      frameworks: ["JUnit", "JFreeChart"],
      tools: ["Gradle", "TCP"]
    },
    items: [
      "Java",
      "Kotlin DSL",
      "JUnit",
      "JFreeChart",
      "Gradle",
      "TCP"
    ],
    tags: ["Java", "Distributed Systems", "TCP", "Concurrency", "JUnit"]
  },

  // ── 21. SO ──
  {
    name: "SO",
    title: "SO — Team Operating Systems Project (Upstream)",
    hidden: true,
    description: "Original C operating systems course team repository. Contributed FIFO-based execution coordination, file/cache functionality, search-process logic, testing scripts, and concurrency fixes.",
    link: "https://github.com/nunom27/SO",
    techStack: {
      languages: ["C"],
      frameworks: ["GLib"],
      tools: ["GCC", "GNU Make", "POSIX/Linux"]
    },
    items: [
      "C",
      "GLib",
      "GCC",
      "GNU Make",
      "POSIX/Linux"
    ],
    tags: ["C", "POSIX/Linux", "IPC", "GNU Make", "GLib"]
  }
];
