import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Gallery.scss';

const galleryItems = [
  {
    id: 1,
    title: 'Modern Classrooms',
    category: 'Infrastructure',
    description: 'State-of-the-art smart classrooms with interactive displays and advanced technology.',
    gradient: 'linear-gradient(135deg, #0d2040, #1a3a5c)',
    icon: '🏫',
    accent: '#00d4aa',
    size: 'large',
  },
  {
    id: 2,
    title: 'Science Labs',
    category: 'Facilities',
    description: 'Fully equipped laboratories for hands-on learning experiences.',
    gradient: 'linear-gradient(135deg, #1a0d2e, #2d1b4e)',
    icon: '🔬',
    accent: '#7c3aed',
    size: 'small',
  },
  {
    id: 3,
    title: 'Sports Complex',
    category: 'Athletics',
    description: 'World-class sports facilities to nurture athletic talent and physical wellness.',
    gradient: 'linear-gradient(135deg, #1a1000, #3d2800)',
    icon: '⚽',
    accent: '#ff6b35',
    size: 'small',
  },
  {
    id: 4,
    title: 'Digital Library',
    category: 'Resources',
    description: 'Access thousands of books, journals, and digital resources 24/7.',
    gradient: 'linear-gradient(135deg, #001a2e, #002d4a)',
    icon: '📚',
    accent: '#0ea5e9',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Cultural Events',
    category: 'Events',
    description: 'Vibrant cultural programs celebrating diversity and student talent.',
    gradient: 'linear-gradient(135deg, #0a1a00, #162800)',
    icon: '🎭',
    accent: '#10b981',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Student Lounge',
    category: 'Campus Life',
    description: 'Collaborative spaces designed for relaxation and creative thinking.',
    gradient: 'linear-gradient(135deg, #1a0a00, #2e1500)',
    icon: '☕',
    accent: '#f59e0b',
    size: 'small',
  },
  {
    id: 7,
    title: 'Graduation Ceremony',
    category: 'Milestones',
    description: 'Celebrating the achievements and milestones of our brilliant graduates.',
    gradient: 'linear-gradient(135deg, #1a001a, #2e002e)',
    icon: '🎓',
    accent: '#ec4899',
    size: 'small',
  },
];

const GalleryCard = ({ item, index, onClick }) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('gallery-card--visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`gallery-card gallery-card--${item.size}`}
      style={{ '--accent': item.accent, '--delay': `${index * 60}ms` }}
      onClick={() => onClick(item)}
    >
      <div className="gallery-card__bg" style={{ background: item.gradient }} />
      <div className="gallery-card__noise" />

      <div className="gallery-card__content">
        <span className="gallery-card__icon">{item.icon}</span>
        <div className="gallery-card__info">
          <span className="gallery-card__category">{item.category}</span>
          <h3 className="gallery-card__title">{item.title}</h3>
          <p className="gallery-card__desc">{item.description}</p>
        </div>
      </div>

      <div className="gallery-card__overlay">
        <FiMaximize2 className="gallery-card__expand-icon" />
      </div>

      <div className="gallery-card__border-glow" />
    </div>
  );
};

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(galleryItems.map(g => g.category))];
  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(g => g.category === filter);

  const selectedIndex = selected ? filtered.findIndex(g => g.id === selected.id) : -1;

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) setSelected(filtered[selectedIndex - 1]);
  }, [selectedIndex, filtered]);

  const handleNext = useCallback(() => {
    if (selectedIndex < filtered.length - 1) setSelected(filtered[selectedIndex + 1]);
  }, [selectedIndex, filtered]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected, selectedIndex, handlePrev, handleNext]);

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        {/* Header */}
        <div className="gallery__header">
          <span className="gallery__label">Campus Life</span>
          <h2 className="section-title">
            Explore Our <span>Campus Gallery</span>
          </h2>
          <p className="section-subtitle">
            A glimpse into the vibrant academic environment and world-class facilities at our institution.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="gallery__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gallery__filter-btn ${filter === cat ? 'gallery__filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="gallery__lightbox" onClick={() => setSelected(null)}>
          <div
            className="gallery__lightbox-card"
            style={{ '--accent': selected.accent }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery__lightbox-bg" style={{ background: selected.gradient }} />
            <button className="gallery__lightbox-close" onClick={() => setSelected(null)}>
              <FiX />
            </button>

            <div className="gallery__lightbox-content">
              <span className="gallery__lightbox-icon">{selected.icon}</span>
              <span className="gallery__lightbox-category">{selected.category}</span>
              <h2 className="gallery__lightbox-title">{selected.title}</h2>
              <p className="gallery__lightbox-desc">{selected.description}</p>
            </div>

            {/* Navigation */}
            <div className="gallery__lightbox-nav">
              <button disabled={selectedIndex === 0} onClick={handlePrev}><FiChevronLeft /></button>
              <span>{selectedIndex + 1} / {filtered.length}</span>
              <button disabled={selectedIndex === filtered.length - 1} onClick={handleNext}><FiChevronRight /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;