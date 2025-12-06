import React from 'react';

const languages = [
  "Python", "SQL", "HTML", "CSS", "React", "JavaScript", "Next.js", "Django", "Git"
];

export default function Carousel() {
  return (
    <div style={{ 
      overflow: 'hidden', 
      padding: '60px 0', 
      position: 'relative',
      maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      width: '100%'
    }}>
      <div className="carousel-track" style={{
        display: 'inline-flex',
        width: 'max-content', /* CRITICAL FIX: Forces track to be long */
        animation: 'scroll 40s linear infinite', /* Slower speed (40s) */
      }}>
        {/* Loop 4 times for seamless infinite scroll on 4k screens */}
        {[...languages, ...languages, ...languages, ...languages].map((lang, index) => (
          <div key={index} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 40px', fontWeight: 700, fontSize: '1.5rem', 
            color: 'var(--text-color)', opacity: 0.6,
            transition: 'opacity 0.3s, transform 0.3s'
          }}
          className="carousel-item">
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}