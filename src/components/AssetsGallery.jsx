import React, { useState, useEffect } from 'react';
import { ProjectImageLayout } from './ProjectImageLayout';
import whiteImg from '../../assets/white.webp';
import greyImg from '../../assets/grey.webp';
import SimpleBar from 'simplebar-react';

/**
 * AssetsGallery is an overlay component that previews the raw static image assets
 * and allows testing the 4 layout options (Single, Side-by-side, Grid, Carousel) interactively.
 * Enwrapped in SimpleBar to provide customized scrollbars on all browsers.
 */
export function AssetsGallery({ onClose }) {
  const [selectedLayout, setSelectedLayout] = useState('single');

  // Automatically scroll window to top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Preview image arrays based on selected layout
  const layoutImages = {
    'single': [whiteImg],
    'side-by-side': [whiteImg, greyImg],
    'three-columns': [whiteImg, greyImg, whiteImg],
    'grid': [whiteImg, greyImg, whiteImg, greyImg],
    'carousel': [whiteImg, greyImg, whiteImg, greyImg],
  };

  return (
    <div className="assets-gallery-overlay" style={{ overflow: 'hidden', padding: 0 }}>
      <SimpleBar style={{ maxHeight: '100vh', width: '100%' }}>
        <div className="assets-gallery-container" style={{ margin: '0 auto', padding: '3rem 1.5rem' }}>
          
          {/* Header */}
          <div className="assets-gallery-header">
            <h2 className="assets-gallery-title">[ design-system ]</h2>
            <button onClick={onClose} className="btn-close-gallery" type="button">
              [ close ]
            </button>
          </div>

          {/* Section 1: Available Assets */}
          <div>
            <h3 className="assets-section-title">1. Theme Palette</h3>
            <div className="asset-grid">
              <div className="asset-card">
                <div className="asset-image-wrapper">
                  <img src={whiteImg} alt="white.webp asset" className="asset-img" />
                </div>
                <span className="asset-info">white.webp</span>
              </div>
              <div className="asset-card">
                <div className="asset-image-wrapper">
                  <img src={greyImg} alt="grey.webp asset" className="asset-img" />
                </div>
                <span className="asset-info">grey.webp</span>
              </div>
            </div>
          </div>

          {/* Section 2: Layout Models Preview */}
          <div className="layout-showcase">
            <h3 className="assets-section-title">2. UI Layout Components</h3>
            
            {/* Tabs to select layout model */}
            <div className="layout-selector">
              {['single', 'side-by-side', 'three-columns', 'grid', 'carousel'].map((layout) => (
                <button
                  key={layout}
                  onClick={() => setSelectedLayout(layout)}
                  className={`layout-btn ${selectedLayout === layout ? 'active' : ''}`}
                  type="button"
                >
                  {layout}
                </button>
              ))}
            </div>

            {/* Render live layout demonstration */}
            <div className="layout-preview-box">
              <ProjectImageLayout 
                images={layoutImages[selectedLayout]} 
                layout={selectedLayout} 
              />
            </div>
          </div>

        </div>
      </SimpleBar>
    </div>
  );
}
