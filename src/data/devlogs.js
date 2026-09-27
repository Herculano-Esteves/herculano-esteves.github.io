// Research & devlog dataset featuring active projects
export const RESEARCH_ITEMS = [
  {
    id: 'planet-game-engine',
    title: 'Planet Game Engine',
    period: '2026 - Present',
    tags: ['C++17', 'OpenGL 3.3+', 'Jolt Physics', 'EnTT'],
    summary: 'A custom C++17 space simulation engine featuring double-precision orbits, walkable ship interiors, voxel hull destruction, and multi-anchor terrain streaming.',
    content: `
## Overview
Building a custom C++ game engine from scratch to simulate large-scale space environments, physics-driven starships, and multiplayer foundations. What started as an experiment with planetary orbits has grown into an engine with walkable ship interiors, voxel-based destruction, and procedural terrain.

---

## Phase 1: Engine Foundations & Planetary Scale
Standard game engines rely on 32-bit floats, which quickly cause jitter and broken collisions when dealing with huge distances. I wanted to simulate solar systems accurately without floating-point precision issues, so I built the core directly in C++17:
- **Double-Precision Coordinates:** Using 64-bit precision (glm::dvec3) for entity positions so objects move smoothly across vast planetary distances without jitter.
- **Camera-Relative Rendering:** Shifting large coordinates relative to the camera before sending them to OpenGL 3.3+ in float, keeping visuals clean and jitter-free.
- **ECS & Physics:** Integrating EnTT for data-oriented entity management and Jolt Physics for collisions, taking advantage of SIMD (AVX2) for fast calculations.

---

## Phase 2: Dynamic Ships, Destruction & Multiplayer

### 2.1 The Interior Physics Problem
Once orbital motion was working, I wanted players to build and walk inside their ships while flying through space. I initially tried putting everything into a single physics world, but physics engines struggle when a player tries to walk inside a craft spinning and accelerating at high speeds—characters slide around or clip through floors.

To fix this, I separated physics into two parallel worlds using Jolt Physics:
- **Outer Space:** Simulates planets, gravity, and the ship's outer rigid hull.
- **Ship Interior:** An isolated local space where players, furniture, and loose items move normally on the ship's floor.

A simple transform syncs the interior with the ship in real time, so players can walk around smoothly even during aggressive maneuvers.

### 2.2 Voxel Ships & Hull Destruction
Instead of using static 3D models, I switched to building ships block by block with voxels. I wanted complete creative freedom for the player, where any ship design is possible, and the engine automatically recalculates mass, center of gravity, and rotational inertia on the fly.

I also wanted space battles to feel exciting and chaotic:
- The engine uses graph connectivity algorithms to check if blocks are still physically attached to each other.
- When an explosion cuts a ship in half, the graph detects the break and splits the ship into separate physical pieces that continue tumbling through space independently.

### 2.3 Multi-Anchor Terrain Streaming
In Phase 1, terrain was just an early goal for a single observer. As the project grew, I needed terrain that could support multiple players or probes across different planets at the same time. The streaming system now tracks active regions around multiple anchors and keeps chunks loaded without stuttering the main physics loop.

### 2.4 Determinism & Automated Testing
Game engines can easily become a debugging nightmare, especially with custom physics and multiplayer. I rely heavily on automated tests, with over 310 tests with 6,300+ assertions using doctest.

Tests might feel tedious, but for me they are essential at every step. Their biggest benefit is ensuring determinism between Windows and Linux. Because cross-platform multiplayer needs physics and block destruction to match exactly on both systems, automated tests give me confidence that code changes won't cause silent desyncs.

---

## Phase 3: What I'm Exploring Next
- Networking transport layer with client-side prediction and snapshot interpolation.
- Generating procedural terrain meshes directly on the GPU using compute shaders.
    `
  },
  {
    id: 'exam-preparation-platform',
    title: 'Exam Preparation Platform',
    period: '2025 - Present',
    tags: ['React', 'Open-Source'],
    summary: 'An open-source study platform designed to help university students practice and prepare for exams in any subject.',
    content: `
## Overview
An open-source web application designed to help university students study more effectively. The goal is to provide a clean, distraction-free place to practice mock tests and verify answers for any course.

Key features:
- **Universal Practice:** Modular question sets adaptable to different subjects.
- **Instant Feedback:** Timed sessions with automated scoring and answer reviews.
- **Lightweight & Private:** Fast React frontend with zero tracking.

---

## Motivation & Study Flow
Most study platforms either lack flexible question customization or clutter the experience with unnecessary paywalls. My focus is keeping this completely open and student-first: providing clean statistical feedback on weak areas, instant answer verification, and a distraction-free environment for deep practice sessions.

---

## What I'm Exploring Next
- Conducting user testing with university students to evaluate study flow and usability.
- Adding community question sharing and study deck imports.
    `
  },
  {
    id: 'security-ai',
    title: 'Security-AI',
    period: '2026 - Present',
    tags: ['Python', 'LLM Security', 'Prompt Injection', 'Ollama'],
    summary: 'A modular framework for security auditing, vulnerability evaluation, and automated Prompt Injection testing against local and remote Large Language Models.',
    content: `
## Overview
A modular framework for security auditing, vulnerability evaluation, and automated Prompt Injection testing against local and remote Large Language Models. Built to evaluate LLM defenses, sandbox tools, and system prompts under adversarial conditions.

While underlying models support multiple languages, all prompts, evaluation scripts, and dataset interactions are standardized in English to prevent formatting and schema mismatches during automated testing.

Key components:
- **Aegis Engine:** Core security evaluation framework, AegisLab simulated environments, and attack runner engine.
- **Attack Library:** YAML attack catalog with structured payloads (OWASP LLM01, MITRE ATLAS).
- **Isolated AI Client:** Dedicated local inference module configured for Ollama (\`qwen3.5:4b\` with controlled temperature).
- **Sandbox Vault:** Protected filesystem sandbox directory containing monitored system and business data.
- **Reports & ADRs:** Technical evaluation reports, incident logs, and Architecture Decision Records (ADRs).
- **Setup & Automation:** Automated scripts to start, monitor, and clean up local model processes.

---

## Execution & Security Auditing
The project provides dedicated Python scripts for chatting, auditing sandbox tools, and executing automated attacks:
- **Interactive Sandbox Agent:** Interactive CLI where the AI inspects sandbox files (\`read_file\`, \`list_files\`, \`read_all_files\`) while testing tool call constraints.
- **AegisLab Scenarios:** Direct testing and chat against isolated security lab environments (such as basic prompt injection).
- **Prompt Injection Runner:** Executes structured YAML attack payloads against live local models or lab targets to evaluate defense metrics.
- **Automated Verification:** Comprehensive test suite built with \`pytest\` covering unit tests, tool validation, and security attack simulations.

---

## What I'm Exploring Next
- Expanding the attack catalog to include multi-turn jailbreaks and indirect prompt injection vectors.
- Automated generation of security evaluation reports and defensive benchmark scoring.
    `
  }
];
