import { useEffect, useRef, useState } from 'react';
import meetTheDevAvatar from '../../assets/meetTheDev.jpeg';
import './DeveloperSignature.scss';
import { formatExperience } from '../../utilities/dateUtils';

export function DeveloperSignature() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  const joinDate = "2020-09-01"; 
  const expText = formatExperience(joinDate);

  return (
    <section
      ref={sectionRef}
      id="developer-signature"
      className={`developer-signature ${isVisible ? 'is-visible' : ''}`}
      aria-label="Developer Signature"
    >
      <div className="signature-divider" />

      <div className="signature-container">
        <h2 className="signature-heading">Meet the Developer</h2>

        <div className="identity-block">
          <img
            src={meetTheDevAvatar}
            alt="Zahid Jamkhandi - Senior Experience Engineer"
            className="developer-avatar"
            loading="lazy"
          />
          <h3 className="developer-name">Zahid Jamkhandi</h3>
          <p className="developer-tagline">
            <strong>
              Driven by curiosity, Powered by code.
            </strong>
          </p>
        </div>

        <div className="biography">
          <p className="bio-paragraph">
            Hi, I'm <strong>Zahid Jamkhandi</strong> 👋
          </p>

          <p className="bio-paragraph">
            I'm a frontend engineer who enjoys building products where great user experience meets solid engineering. Over the past <strong>{expText} years</strong>, I've focused on creating scalable, high-performance applications with React, TypeScript, and modern web technologies.
          </p>

          <p className="bio-paragraph">
            Professionally, I've had the opportunity to work on <strong>AI-powered enterprise applications</strong> for firms like <strong>Goldman Sachs</strong> and <strong>Monster.com (now Foundit)</strong>, helping build experiences that bring Generative AI into real-world developer and business workflows. That journey has deepened my interest in frontend architecture, performance engineering, and designing intuitive AI experiences.
          </p>

          <p className="bio-paragraph">
            I love turning complex ideas into intuitive experiences—whether that's architecting reusable component systems, optimizing rendering performance, or exploring how AI can make software more useful for developers and users alike.
          </p>

          <p className="bio-paragraph">
            <strong>algo_viz</strong> is one of those passion projects. It combines my interest in software engineering and education by making algorithms something you can observe, experiment with, and truly understand instead of simply reading about.
          </p>

          <p className="bio-paragraph">
            Thanks for exploring <strong>algo_viz</strong>. If you enjoyed it or have feedback, I'd love to connect.
          </p>
        </div>

        <div className="contact-links">

          <a
            href="https://github.com/zahidjamkhandi"
            className="contact-link"
            aria-label="GitHub Profile of Zahid Jamkhandi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="contact-icon"
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span>github.com/zahidjamkhandi</span>
          </a>

          <a
            href="mailto:jamkhandizahid@gmail.com"
            className="contact-link"
            aria-label="Email Zahid Jamkhandi"
          >
            <svg
              className="contact-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>jzahid.official@gmail.com</span>
          </a>

          <a
            href="https://in.linkedin.com/in/zahidjmk"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            aria-label="Connect with Zahid Jamkhandi on LinkedIn"
          >
            <svg
              className="contact-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>Zahid Jamkhandi</span>
          </a>
        </div>

        <p className="signature-footer">Thanks for exploring algo_viz.</p>
      </div>
    </section>
  );
}
