import { Link } from 'react-router-dom';
import { DeveloperSignature } from '../components/DeveloperSignature/DeveloperSignature';
import './LandingPage.scss';

export function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="hero-section">
          <h1 className="hero-title">
            algo<span className="nvidia-accent">_</span>viz
          </h1>
          <p className="hero-subtitle">
            High-Performance Algorithm Visualization Platform
          </p>
        </header>

        <section className="description-section">
          <p className="description-text">
            Experience algorithm execution like never before. <strong>algo_viz</strong> is a
            premium developer tool that transforms abstract computer science concepts into
            synchronized visual timelines.
          </p>
          <p className="description-text">
            Track time complexities in real-time. Profile data state transitions. Witness the
            mechanical precision of sorting algorithms, pathfinding strategies, and search
            operations through hardware-accelerated animations.
          </p>
          <p className="description-text">
            Built with React, TypeScript, and Vite. Engineered for performance. Designed for
            clarity.
          </p>
          <button
            className="meet-developer-cta"
            onClick={() => {
              const section = document.getElementById('developer-signature');
              if (section) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                section.scrollIntoView({
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start',
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const section = document.getElementById('developer-signature');
                if (section) {
                  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  section.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                  });
                }
              }
            }}
            aria-label="Scroll to Developer Signature section"
          >
            <span className="cta-text">
              Curious who built algo_viz?
              <br />
              Meet the developer ↓
            </span>
          </button>
        </section>

        <section className="features-section">
          <h2 className="features-title">Core Capabilities</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Real-Time Execution</h3>
              <p className="feature-description">
                Every algorithm step synchronized to a unified clock. Complexity differences
                become visually apparent through animation duration.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">State Tracking Pipeline</h3>
              <p className="feature-description">
                Comprehensive data flow visualization. Track comparisons, swaps, overwrites,
                and pivot selections with color-coded precision.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Custom Dataset Input</h3>
              <p className="feature-description">
                Test algorithms with your own data. Dynamic array insertion with instant
                normalization and rendering.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚙️</div>
              <h3 className="feature-title">Performance Controls</h3>
              <p className="feature-description">
                Variable speed playback. Emergency reset. Full animation control with
                memory-safe timeout management.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Choose Your Visualizer</h2>
          <div className="cta-buttons">
            <Link to="/sort" className="cta-button cta-button-active">
              <span className="button-text">Sorting Visualizer</span>
              <span className="button-icon">→</span>
            </Link>
            <button className="cta-button cta-button-disabled" disabled>
              <span className="button-text">Path Finding Visualizer</span>
              <span className="coming-soon-badge">Coming Soon</span>
            </button>
            <button className="cta-button cta-button-disabled" disabled>
              <span className="button-text">Searching Visualizer</span>
              <span className="coming-soon-badge">Coming Soon</span>
            </button>
          </div>
        </section>

        <footer className="landing-footer">
          <p className="footer-text">
            Built with precision. Powered by React 19, TypeScript, and Vite.
          </p>
        </footer>
      </div>

      <DeveloperSignature />
    </div>
  );
}
