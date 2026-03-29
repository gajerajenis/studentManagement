import React, { useEffect, useRef } from 'react';
import { FiUsers, FiBarChart2, FiAward, FiClock, FiShield, FiZap } from 'react-icons/fi';
import './FeatureBoxes.scss';

const features = [
  {
    icon: <FiUsers />,
    title: 'Student Profiles',
    description: 'Comprehensive student records with grades, courses, attendance, and personal details all in one place.',
    accent: '#00d4aa',
    stat: '2,400+',
    statLabel: 'Students',
  },
  {
    icon: <FiBarChart2 />,
    title: 'Analytics & Reports',
    description: 'Real-time dashboards and detailed reports to track academic performance and identify improvement areas.',
    accent: '#7c3aed',
    stat: '99%',
    statLabel: 'Accuracy',
  },
  {
    icon: <FiAward />,
    title: 'Grade Management',
    description: 'Effortlessly manage grades, generate report cards, and track semester-wise performance trends.',
    accent: '#ff6b35',
    stat: '50+',
    statLabel: 'Reports',
  },
  {
    icon: <FiClock />,
    title: 'Attendance Tracking',
    description: 'Automated attendance system with instant notifications and monthly attendance reports for students.',
    accent: '#0ea5e9',
    stat: '100%',
    statLabel: 'Automated',
  },
  {
    icon: <FiShield />,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with role-based access control, data encryption, and regular backups.',
    accent: '#10b981',
    stat: '256-bit',
    statLabel: 'Encryption',
  },
  {
    icon: <FiZap />,
    title: 'Lightning Fast',
    description: 'Built for speed and performance. Access any student data in milliseconds with our optimized system.',
    accent: '#f59e0b',
    stat: '<50ms',
    statLabel: 'Response',
  },
];

const FeatureBoxes = () => {
  const boxRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('feature-box--visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    boxRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features" id="about">
      <div className="container">
        {/* Header */}
        <div className="features__header">
          <span className="features__label">Why EduManage?</span>
          <h2 className="section-title">
            Everything You Need to<br />
            <span>Manage Students</span>
          </h2>
          <p className="section-subtitle">
            A complete toolkit for educators and administrators to streamline every aspect of student management.
          </p>
        </div>

        {/* Grid */}
        <div className="features__grid">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => (boxRefs.current[i] = el)}
              className="feature-box"
              style={{
                '--accent': feature.accent,
                '--delay': `${i * 80}ms`,
              }}
            >
              {/* Glow */}
              <div className="feature-box__glow" />

              {/* Top row */}
              <div className="feature-box__top">
                <div className="feature-box__icon">
                  {feature.icon}
                </div>
                <div className="feature-box__stat">
                  <span className="feature-box__stat-value">{feature.stat}</span>
                  <span className="feature-box__stat-label">{feature.statLabel}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="feature-box__title">{feature.title}</h3>
              <p className="feature-box__desc">{feature.description}</p>

              {/* Bottom accent line */}
              <div className="feature-box__line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBoxes;