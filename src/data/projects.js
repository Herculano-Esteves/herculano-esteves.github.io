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

// Images for Entity Editor
import entityMenuImg from '../../assets/projects/entity_editor/editor_menu.webp';
import entityTextureImg from '../../assets/projects/entity_editor/texture_Manager.webp';
import entityUvImg from '../../assets/projects/entity_editor/uv_edditor.webp';

// Projects data ordered: Exam Preparation, Fleet Simulator, Flight Companion, Entity Editor
export const PROJECTS_DATA = [
  {
    title: "Exam Preparation Platform",
    description: "A software engineering exam preparation platform, built to optimize studying with interactive tests and performance analysis.",
    images: [examSubjectImg, examChoosingImg, examQuestionImg],
    layout: 'carousel',
    aspectRatio: 'landscape',
    link: "https://herculano-esteves.github.io/examPreparation/"
  },
  {
    title: "Fleet Simulator",
    description: "A comprehensive fleet simulation for analyzing EV and Gas vehicle operations in urban environments. Models real OpenStreetMap data, traffic conditions, hotspot demands, weather states, charging logistics, and AI routing.",
    images: [fleetMenuImg, fleetTrafficImg],
    layout: 'side-by-side',
    aspectRatio: 'landscape',
    link: "https://github.com/Herculano-Esteves/AI-25-26"
  },
  {
    title: "Flight Companion",
    description: "Consolidates flight tracking, boarding pass barcode parsing, trip planning, and context-aware chatbot guides. Developed in 48 hours for the BugsByte 2026 Hackathon.",
    images: [flightMenuImg, flightPlanImg, flightTicketImg],
    layout: 'three-columns',
    aspectRatio: 'portrait',
    videoUrl: "https://www.youtube-nocookie.com/embed/pTjHLOc0qTQ",
    link: "https://github.com/Herculano-Esteves/Flight_Companion"
  },
  {
    title: "Entity Editor",
    description: "A modular 2D Entity Editor designed for creating complex character rigs and entities for custom game engines. Features include Sprite Management, Pivot Control, UV Editing, and precise Hitbox Collision definitions.",
    images: [entityMenuImg, entityTextureImg, entityUvImg],
    layout: 'carousel',
    aspectRatio: 'landscape',
    link: "https://github.com/Herculano-Esteves/entityEditor"
  }
];
