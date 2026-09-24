import React, { useState } from 'react';
import { ScrambleText } from '../components/ScrambleText';
import { ProjectImageLayout } from '../components/ProjectImageLayout';
import { CONFIG } from '../config';

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
const PROJECTS_DATA = [
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

// Project Card Subcomponent to handle individual Media Toggles (Video vs. Images)
function ProjectCard({ project, index, isLast }) {
  const [showVideo, setShowVideo] = useState(false);
  const hasImages = project.images && project.images.length > 0;

  return (
    <div style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: isLast ? '0.5rem' : '2rem', width: '100%' }}>
      
      {/* Title, Media Toggle & Links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
          <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
            <ScrambleText text={project.title} duration={200} delay={100 + index * 50} />
          </h3>
          {project.videoUrl && hasImages && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="btn-link"
              style={{ fontSize: 'max(12px, calc(var(--terminal-font-size) * 0.75))', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              type="button"
            >
              {showVideo ? "[ view screenshots ]" : "[ watch video ]"}
            </button>
          )}
        </div>

        {/* Action Links: report.pdf / paper / visit */}
        <div style={{ display: 'flex', gap: '1.5ch', alignItems: 'center' }}>
          {(project.reportUrl || project.paperUrl) && (
            <a href={project.reportUrl || project.paperUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
              [ report.pdf ]
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-link">
              [ visit ]
            </a>
          )}
        </div>
      </div>

      {/* Tags if present */}
      {project.tags && project.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '1.5ch', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {project.tags.map((tag, tIdx) => (
            <span key={tIdx} style={{ color: 'var(--secondary)', fontSize: '0.85em' }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {project.description && (
        <p className="project-desc" style={{ marginBottom: hasImages || project.videoUrl ? '1rem' : '0' }}>
          {project.description}
        </p>
      )}

      {/* Media: Embedded Showcase Video or Image Layout (Only rendered if media exists) */}
      {(hasImages || project.videoUrl) && (
        <div style={{ marginTop: '1rem' }}>
          {project.videoUrl && (
            <div 
              className="project-video-container" 
              style={{ 
                display: showVideo ? 'block' : 'none',
                position: 'relative', 
                paddingBottom: '56.25%', 
                height: 0, 
                overflow: 'hidden', 
                border: '1px solid var(--muted)', 
                margin: '1rem 0' 
              }}
            >
              <iframe
                src={showVideo ? project.videoUrl : ""}
                title={`${project.title} Video Showcase`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {hasImages && (
            <div style={{ display: (!showVideo || !project.videoUrl) ? 'block' : 'none' }}>
              <ProjectImageLayout 
                images={project.images} 
                layout={project.layout} 
                aspectRatio={project.aspectRatio} 
                projectTitle={project.title}
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export function Projects() {
  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 0 auto' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Projects" duration={200} delay={0} />
        </h2>
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            isLast={index === PROJECTS_DATA.length - 1} 
          />
        ))}
      </div>
    </div>
  );
}
