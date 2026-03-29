import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Slider.scss';

const slides = [
  {
    id: 1,
    tagline: 'Next-Gen Education Platform',
    title: 'Empower Every',
    titleHighlight: 'Students Journey',
    subtitle: 'Track progress, manage records, and unlock academic potential with our cutting-edge student management system.',
    cta: 'Explore Students',
    ctaLink: '/students',
    stats: [
      { value: '2,400+', label: 'Students Enrolled' },
      { value: '98%', label: 'Success Rate' },
      { value: '120+', label: 'Courses' },
    ],
    gradient: 'linear-gradient(135deg, #0a0f1a 0%, #0d2040 50%, #0a1530 100%)',
    accentColor: '#00d4aa',
    shape: 'circles',
  },
  {
    id: 2,
    tagline: 'Smart Analytics Dashboard',
    title: 'Data-Driven',
    titleHighlight: 'Academic Insights',
    subtitle: 'Get real-time insights into student performance, attendance trends, and course completion metrics.',
    cta: 'Manage Students',
    ctaLink: '/students',
    stats: [
      { value: '360°', label: 'Student View' },
      { value: '50+', label: 'Reports Generated' },
      { value: '24/7', label: 'Access Anywhere' },
    ],
    gradient: 'linear-gradient(135deg, #0a0f1a 0%, #1a0d2e 50%, #0f0a1a 100%)',
    accentColor: '#7c3aed',
    shape: 'hexagons',
  },
  {
    id: 3,
    tagline: 'Seamless Administration',
    title: 'Simplify Your',
    titleHighlight: 'Campus Operations',
    subtitle: 'From enrollment to graduation — manage your entire institution from one powerful, intuitive platform.',
    cta: 'Get Started',
    ctaLink: '/students',
    stats: [
      { value: '5 min', label: 'Setup Time' },
      { value: '100%', label: 'Cloud-Based' },
      { value: '∞', label: 'Scalability' },
    ],
    gradient: 'linear-gradient(135deg, #0a0f1a 0%, #1a1000 50%, #0f1a0a 100%)',
    accentColor: '#ff6b35',
    shape: 'triangles',
  },
];

const AnimatedText = ({ text, isActive, delay = 0 }) => {
  return (
    <span className={`animated-text ${isActive ? 'animated-text--active' : ''}`}
      style={{ '--delay': `${delay}ms` }}>
      {text.split('').map((char, i) => (
        <span key={i} className="animated-text__char"
          style={{ '--char-delay': `${delay + i * 30}ms` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const slide = slides[current];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    clearInterval(intervalRef.current);
    clearInterval(progressRef.current);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
      startAutoplay();
    }, 400);
  };

  const nextSlide = () => goToSlide((current + 1) % slides.length);
  const prevSlide = () => goToSlide((current - 1 + slides.length) % slides.length);

  const startAutoplay = () => {
    setProgress(0);
    let prog = 0;
    progressRef.current = setInterval(() => {
      prog += 0.5;
      setProgress(prog);
      if (prog >= 100) clearInterval(progressRef.current);
    }, 25);
    intervalRef.current = setTimeout(() => {
      setCurrent(prev => {
        const next = (prev + 1) % slides.length;
        return next;
      });
      setProgress(0);
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [current]);

  return (
    <section
      className={`slider ${isTransitioning ? 'slider--transitioning' : ''}`}
      style={{ '--accent': slide.accentColor, background: slide.gradient }}
    >
      {/* Background shapes */}
      <div className={`slider__bg-shapes slider__bg-shapes--${slide.shape}`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`shape shape--${i}`} />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="slider__grid-overlay" />

      {/* Content */}
      <div className="container slider__content">
        <div className="slider__text-col">
          {/* Tagline */}
          <div className={`slider__tagline ${!isTransitioning ? 'slider__tagline--visible' : ''}`}>
            <span className="slider__tagline-dot" />
            {slide.tagline}
          </div>

          {/* Main Title */}
          <h1 className={`slider__title ${!isTransitioning ? 'slider__title--visible' : ''}`}>
            <span className="slider__title-line">{slide.title}</span>
            <br />
            <span className="slider__title-highlight">
              <AnimatedText text={slide.titleHighlight} isActive={!isTransitioning} delay={200} />
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`slider__subtitle ${!isTransitioning ? 'slider__subtitle--visible' : ''}`}>
            {slide.subtitle}
          </p>

          {/* CTA */}
          <div className={`slider__cta-group ${!isTransitioning ? 'slider__cta-group--visible' : ''}`}>
            <Link to={slide.ctaLink} className="slider__cta-primary">
              <span>{slide.cta}</span>
              <FiArrowRight className="slider__cta-icon" />
            </Link>
            <a href="#about" className="slider__cta-secondary">
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className={`slider__stats ${!isTransitioning ? 'slider__stats--visible' : ''}`}>
            {slide.stats.map((stat, i) => (
              <div key={i} className="slider__stat">
                <span className="slider__stat-value">{stat.value}</span>
                <span className="slider__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className={`slider__visual ${!isTransitioning ? 'slider__visual--visible' : ''}`}>
          <div className="slider__visual-card">
            <div className="slider__visual-header">
              <div className="slider__visual-dots">
                <span /><span /><span />
              </div>
              <span className="slider__visual-label">Student Dashboard</span>
            </div>
            <div className="slider__visual-body">
              <div className="slider__visual-stat-row">
                {['Enrolled', 'Active', 'Graduated'].map((label, i) => (
                  <div key={i} className="slider__visual-mini-stat">
                    <div className="slider__visual-mini-bar" style={{ '--fill': `${[85, 92, 78][i]}%` }} />
                    <span>{label}</span>
                    <strong>{['850', '920', '780'][i]}</strong>
                  </div>
                ))}
              </div>
              <div className="slider__visual-avatar-row">
                {['AS', 'PP', 'RM', 'SG', 'KS'].map((av, i) => (
                  <div key={i} className="slider__visual-avatar" style={{ '--av-i': i }}>
                    {av}
                  </div>
                ))}
                <span className="slider__visual-more">+40</span>
              </div>
              <div className="slider__visual-progress-block">
                <span>Course Completion</span>
                <div className="slider__visual-progress-bar">
                  <div className="slider__visual-progress-fill" style={{ '--width': '78%' }} />
                </div>
                <span>78%</span>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <div className="slider__badge slider__badge--1">
            <span className="slider__badge-icon">🎓</span>
            <span>Top Performer</span>
          </div>
          <div className="slider__badge slider__badge--2">
            <span className="slider__badge-icon">📊</span>
            <span>Live Analytics</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="slider__controls">
        <button className="slider__arrow slider__arrow--prev" onClick={prevSlide} aria-label="Previous">
          <FiChevronLeft />
        </button>

        {/* Indicators */}
        <div className="slider__indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider__indicator ${i === current ? 'slider__indicator--active' : ''}`}
              onClick={() => goToSlide(i)}
            >
              {i === current && (
                <svg viewBox="0 0 36 36" className="slider__progress-ring">
                  <circle cx="18" cy="18" r="16" className="slider__progress-track" />
                  <circle cx="18" cy="18" r="16" className="slider__progress-fill"
                    style={{ '--progress': progress }} />
                </svg>
              )}
              <span className="slider__indicator-dot" />
            </button>
          ))}
        </div>

        <button className="slider__arrow slider__arrow--next" onClick={nextSlide} aria-label="Next">
          <FiChevronRight />
        </button>
      </div>

      {/* Scroll hint */}
      <div className="slider__scroll-hint">
        <div className="slider__scroll-mouse">
          <div className="slider__scroll-wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Slider;