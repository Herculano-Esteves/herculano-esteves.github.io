import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * ProjectImageLayout renders a set of project images using one of four layouts:
 * - 'single': One full-width image.
 * - 'side-by-side': Two images next to each other.
 * - 'grid': Four images in a 2x2 grid.
 * - 'three-columns': Three images side-by-side.
 * - 'carousel': Interactive image slideshow with controls.
 * Supports 'landscape' (16:9) and 'portrait' (9:16) aspect ratios.
 * Includes full WCAG 2.1 AA keyboard accessibility and click-to-zoom Lightbox modal.
 */
export function ProjectImageLayout({ images = [], layout = 'single', aspectRatio = 'landscape', projectTitle = 'Project' }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      }
    };
    if (zoomedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % images.length);
  };

  const makeKeyboardHandler = (img) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setZoomedImage(img);
    }
  };

  return (
    <>
      <div className="project-images-container">
        {layout === 'single' && (
          <div className={`layout-single ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            <div 
              className="project-img-item" 
              onClick={() => setZoomedImage(images[0])}
              onKeyDown={makeKeyboardHandler(images[0])}
              tabIndex={0}
              role="button"
              aria-label={`Enlarge ${projectTitle} screenshot`}
            >
              <img src={images[0]} alt={`${projectTitle} screenshot`} className="project-img-element" />
            </div>
          </div>
        )}

        {layout === 'side-by-side' && (
          <div className={`layout-side-by-side ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            <div 
              className="project-img-item" 
              onClick={() => setZoomedImage(images[0])}
              onKeyDown={makeKeyboardHandler(images[0])}
              tabIndex={0}
              role="button"
              aria-label={`Enlarge ${projectTitle} screenshot 1`}
            >
              <img src={images[0]} alt={`${projectTitle} screenshot 1`} className="project-img-element" />
            </div>
            <div 
              className="project-img-item" 
              onClick={() => setZoomedImage(images[1] || images[0])}
              onKeyDown={makeKeyboardHandler(images[1] || images[0])}
              tabIndex={0}
              role="button"
              aria-label={`Enlarge ${projectTitle} screenshot 2`}
            >
              <img src={images[1] || images[0]} alt={`${projectTitle} screenshot 2`} className="project-img-element" />
            </div>
          </div>
        )}

        {layout === 'grid' && (
          <div className={`layout-grid-4 ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            {images.slice(0, 4).map((img, idx) => (
              <div 
                key={idx}
                className="project-img-item" 
                onClick={() => setZoomedImage(img)}
                onKeyDown={makeKeyboardHandler(img)}
                tabIndex={0}
                role="button"
                aria-label={`Enlarge ${projectTitle} screenshot ${idx + 1}`}
              >
                <img src={img} alt={`${projectTitle} screenshot ${idx + 1}`} className="project-img-element" />
              </div>
            ))}
          </div>
        )}

        {layout === 'three-columns' && (
          <div className={`layout-three-columns ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            {images.slice(0, 3).map((img, idx) => (
              <div 
                key={idx}
                className="project-img-item" 
                onClick={() => setZoomedImage(img)}
                onKeyDown={makeKeyboardHandler(img)}
                tabIndex={0}
                role="button"
                aria-label={`Enlarge ${projectTitle} screenshot ${idx + 1}`}
              >
                <img src={img} alt={`${projectTitle} screenshot ${idx + 1}`} className="project-img-element" />
              </div>
            ))}
          </div>
        )}

        {layout === 'carousel' && (
          <div className={`layout-carousel ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`} style={{ position: 'relative' }}>
            {images.map((img, idx) => (
              <div
                key={idx}
                className="carousel-slide"
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: carouselIndex === idx ? 1 : 0,
                  zIndex: carouselIndex === idx ? 1 : 0,
                  pointerEvents: carouselIndex === idx ? 'auto' : 'none',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onClick={() => setZoomedImage(img)}
                onKeyDown={makeKeyboardHandler(img)}
                tabIndex={carouselIndex === idx ? 0 : -1}
                role="button"
                aria-label={`Enlarge ${projectTitle} screenshot ${idx + 1}`}
              >
                <img 
                  src={img} 
                  alt={`${projectTitle} screenshot ${idx + 1}`} 
                  className="project-img-element" 
                />
              </div>
            ))}
            {images.length > 1 && (
              <div className="carousel-controls">
                <button onClick={handlePrev} className="carousel-btn" type="button" aria-label="Previous screenshot">&lt;</button>
                <span className="carousel-indicator" aria-live="polite">{carouselIndex + 1}/{images.length}</span>
                <button onClick={handleNext} className="carousel-btn" type="button" aria-label="Next screenshot">&gt;</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Overlay rendered at body level via React Portal */}
      {zoomedImage && createPortal(
        <div 
          className="lightbox-overlay" 
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} Enlarge View`}
        >
          <div className="lightbox-content">
            <img src={zoomedImage} alt={`${projectTitle} enlarged view`} className="lightbox-image" />
            <button className="lightbox-close" type="button" onClick={() => setZoomedImage(null)}>
              [ click anywhere or press ESC to close ]
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
