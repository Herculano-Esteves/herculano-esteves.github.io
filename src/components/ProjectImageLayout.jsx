import React, { useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ProjectImageLayout renders a set of project images using one of four layouts:
 * - 'single': One full-width image.
 * - 'side-by-side': Two images next to each other.
 * - 'grid': Four images in a 2x2 grid.
 * - 'carousel': Interactive image slideshow with controls.
 * Supports 'landscape' (16:9) and 'portrait' (9:16) aspect ratios.
 * Includes a Click-to-Zoom lightbox modal overlay rendered via React Portal.
 */
export function ProjectImageLayout({ images = [], layout = 'single', aspectRatio = 'landscape' }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="project-images-container">
        {layout === 'single' && (
          <div className={`layout-single ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            <div className="project-img-item" onClick={() => setZoomedImage(images[0])}>
              <img src={images[0]} alt="Project Layout Single" className="project-img-element" />
            </div>
          </div>
        )}

        {layout === 'side-by-side' && (
          <div className={`layout-side-by-side ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            <div className="project-img-item" onClick={() => setZoomedImage(images[0])}>
              <img src={images[0]} alt="Side-by-side 1" className="project-img-element" />
            </div>
            <div className="project-img-item" onClick={() => setZoomedImage(images[1] || images[0])}>
              <img src={images[1] || images[0]} alt="Side-by-side 2" className="project-img-element" />
            </div>
          </div>
        )}

        {layout === 'grid' && (
          <div className={`layout-grid-4 ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            <div className="project-img-item" onClick={() => setZoomedImage(images[0])}>
              <img src={images[0]} alt="Grid 1" className="project-img-element" />
            </div>
            <div className="project-img-item" onClick={() => setZoomedImage(images[1] || images[0])}>
              <img src={images[1] || images[0]} alt="Grid 2" className="project-img-element" />
            </div>
            <div className="project-img-item" onClick={() => setZoomedImage(images[2] || images[0])}>
              <img src={images[2] || images[0]} alt="Grid 3" className="project-img-element" />
            </div>
            <div className="project-img-item" onClick={() => setZoomedImage(images[3] || images[1] || images[0])}>
              <img src={images[3] || images[1] || images[0]} alt="Grid 4" className="project-img-element" />
            </div>
          </div>
        )}

        {layout === 'three-columns' && (
          <div className={`layout-three-columns ${aspectRatio === 'portrait' ? 'portrait-ratio' : ''}`}>
            <div className="project-img-item" onClick={() => setZoomedImage(images[0])}>
              <img src={images[0]} alt="Three-columns 1" className="project-img-element" />
            </div>
            <div className="project-img-item" onClick={() => setZoomedImage(images[1] || images[0])}>
              <img src={images[1] || images[0]} alt="Three-columns 2" className="project-img-element" />
            </div>
            <div className="project-img-item" onClick={() => setZoomedImage(images[2] || images[1] || images[0])}>
              <img src={images[2] || images[1] || images[0]} alt="Three-columns 3" className="project-img-element" />
            </div>
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
              >
                <img 
                  src={img} 
                  alt={`Carousel Slide ${idx + 1}`} 
                  className="project-img-element" 
                />
              </div>
            ))}
            {images.length > 1 && (
              <div className="carousel-controls">
                <button onClick={handlePrev} className="carousel-btn" type="button">&lt;</button>
                <span className="carousel-indicator">{carouselIndex + 1}/{images.length}</span>
                <button onClick={handleNext} className="carousel-btn" type="button">&gt;</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Overlay rendered at body level via React Portal */}
      {zoomedImage && createPortal(
        <div className="lightbox-overlay" onClick={() => setZoomedImage(null)}>
          <div className="lightbox-content">
            <img src={zoomedImage} alt="Zoomed Project Screen" className="lightbox-image" />
            <button className="lightbox-close" type="button">
              [ click anywhere to close ]
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
