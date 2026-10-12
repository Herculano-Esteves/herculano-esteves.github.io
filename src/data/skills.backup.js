// Skills and proficiencies dataset categorized into Spoken Languages, Programming Languages, Technologies & Frameworks, and Tools & Platforms.

export const SKILL_CATEGORIES = [
  { id: 'spoken', title: 'Languages' },
  { id: 'programming', title: 'Programming Languages' },
  { id: 'technologies', title: 'Technologies & Frameworks' },
  { id: 'tools', title: 'Tools & Environment' },
];

export const SKILLS_DATA = [
  // 1. Spoken / Natural Languages
  {
    id: 'pt',
    category: 'spoken',
    name: 'Portuguese',
    level: 'Native',
    badge: 'Native',
  },
  {
    id: 'en',
    category: 'spoken',
    name: 'English',
    level: 'C1 Advanced',
    badge: 'Cambridge C1',
  },

  // 2. Programming Languages
  {
    id: 'cpp',
    category: 'programming',
    name: 'C++',
    level: 'Advanced',
    badge: 'C++17 / C++20',
    context: 'Planet Game Engine & Entity Editor',
    detail: 'Modern C++17/20, STL, memory management, SIMD (AVX2), double-precision coordinate systems, custom engine architecture.'
  },
  {
    id: 'python',
    category: 'programming',
    name: 'Python',
    level: 'Advanced',
    badge: 'FastAPI / Simulation',
    context: 'Fleet Simulator & Web Services',
    detail: 'Algorithmic simulations, heuristic routing, FastAPI asynchronous microservices, data parsing, automation utilities.'
  },
  {
    id: 'go',
    category: 'programming',
    name: 'Go (Golang)',
    level: 'Proficient',
    badge: 'Distributed Systems',
    context: 'Microservices & Concurrent Systems',
    detail: 'High-concurrency servers, goroutines, channels, REST APIs, networked backend services.'
  },
  {
    id: 'js-ts',
    category: 'programming',
    name: 'JavaScript / TypeScript',
    level: 'Proficient',
    badge: 'ES6+ / Full-Stack',
    context: 'Exam Preparation & Mobile Apps',
    detail: 'Modern ES6+, async architectures, strict typing with TypeScript, component lifecycle design, cross-platform UI.'
  },
  {
    id: 'c',
    category: 'programming',
    name: 'C',
    level: 'Proficient',
    badge: 'Low-Level Systems',
    context: 'Systems & Operating Systems',
    detail: 'Pointers, dynamic memory allocation, POSIX system calls, hardware-level architecture comprehension.'
  },
  {
    id: 'sql',
    category: 'programming',
    name: 'SQL',
    level: 'Familiar',
    badge: 'Relational DB',
    context: 'Database Architecture',
    detail: 'Relational schema design, entity normalization, complex joins, indexing strategies, data integrity.'
  },

  // 3. Technologies & Frameworks
  {
    id: 'react',
    category: 'technologies',
    name: 'React',
    level: 'Advanced',
    badge: 'Hooks / Web Apps',
    context: 'Exam Preparation & Portfolio',
    detail: 'Component-driven UI, state managers, custom hooks, virtual DOM performance tuning, responsive terminal interfaces.'
  },
  {
    id: 'opengl',
    category: 'technologies',
    name: 'OpenGL 3.3+',
    level: 'Proficient',
    badge: 'Graphics API',
    context: 'Planet Game Engine',
    detail: 'GLSL shaders, VAOs/VBOs, matrix math (GLM), camera-relative rendering pipelines, framebuffers.'
  },
  {
    id: 'jolt',
    category: 'technologies',
    name: 'Jolt Physics',
    level: 'Proficient',
    badge: 'SIMD Physics Engine',
    context: 'Planet Game Engine',
    detail: 'Rigid body dynamics, multi-world physics isolation (outer space vs. ship interior), AVX2 acceleration.'
  },
  {
    id: 'entt',
    category: 'technologies',
    name: 'EnTT (ECS)',
    level: 'Proficient',
    badge: 'Data-Oriented Design',
    context: 'Planet Game Engine',
    detail: 'High-performance cache-friendly entity component system, component pools, decoupled gameplay architectures.'
  },
  {
    id: 'react-native',
    category: 'technologies',
    name: 'React Native & Expo',
    level: 'Proficient',
    badge: 'Mobile Development',
    context: 'Flight Companion',
    detail: 'Cross-platform mobile apps for iOS and Android, device camera integration, barcode scanning, context-aware chatbot UI.'
  },
  {
    id: 'fastapi',
    category: 'technologies',
    name: 'FastAPI',
    level: 'Proficient',
    badge: 'Async Python API',
    context: 'Fleet Simulator',
    detail: 'High-throughput asynchronous APIs, OpenAPI contract validation, automated documentation, modular routing.'
  },

  // 4. Tools, Platforms & Environments
  {
    id: 'linux',
    category: 'tools',
    name: 'Linux / POSIX',
    level: 'Daily Driver',
    badge: 'OS & CLI',
    context: 'Development Environment',
    detail: 'Linux environment power user, Bash/Zsh scripting, process management, terminal dev tools, POSIX toolchains.'
  },
  {
    id: 'git',
    category: 'tools',
    name: 'Git & GitHub',
    level: 'Advanced',
    badge: 'Version Control',
    context: 'All Projects & CI/CD',
    detail: 'Branching strategies, interactive rebasing, clean commit hygiene, GitHub Actions automation pipelines.'
  },
  {
    id: 'cmake',
    category: 'tools',
    name: 'CMake',
    level: 'Proficient',
    badge: 'Build System',
    context: 'Planet Game Engine & Entity Editor',
    detail: 'Modular cross-platform build scripts, third-party dependency fetching, compilation target configurations.'
  },
  {
    id: 'doctest',
    category: 'tools',
    name: 'doctest',
    level: 'Proficient',
    badge: 'Automated Testing',
    context: 'Planet Game Engine (310+ Tests)',
    detail: 'Test-Driven Development (TDD), determinism verification across Linux and Windows, unit and integration suites.'
  },
  {
    id: 'osm',
    category: 'tools',
    name: 'OpenStreetMap API',
    level: 'Proficient',
    badge: 'Geospatial Data',
    context: 'Fleet Simulator',
    detail: 'Overpass API querying, extracting geospatial road networks and traffic nodes for city-scale simulations.'
  },
  {
    id: 'docker',
    category: 'tools',
    name: 'Docker',
    level: 'Familiar',
    badge: 'Containerization',
    context: 'Deployment & Isolation',
    detail: 'Multi-stage Dockerfiles, isolated development environments, container orchestration.'
  }
];
