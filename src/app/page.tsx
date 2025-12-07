"use client";
import { useState, useEffect } from 'react';
import IDE from '../components/IDE';
import Carousel from '../components/Carousel';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for 10 seconds before showing the site
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 10000ms = 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Hero Section - Reduced whitespace (paddingTop: 80px) */}
      <section id="about" style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap-reverse',
        paddingTop: '80px', gap: '2rem'
      }}>
        
        {/* Left Side: Text */}
        <div style={{ flex: '1', minWidth: '320px' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px' 
          }}>
            Owen Morey
          </h1>
          <h2 style={{ 
            fontSize: '1.5rem', color: 'var(--primary-color)', 
            marginTop: '15px', fontWeight: 500 
          }}>
            Junior Software Engineer
          </h2>
          <p style={{ marginTop: '25px', opacity: 0.7, maxWidth: '450px', lineHeight: 1.7, fontSize: '1.1rem' }}>
            Building immersive web experiences and solving complex problems with clean, efficient code. Always learning, always building.
          </p>
        </div>

        {/* Right Side: Animated IDE */}
        <div style={{ flex: '1', minWidth: '320px', display: 'flex', justifyContent: 'center' }}>
          <IDE />
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" style={{ padding: '60px 0' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Achievements</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
             <h3 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>Telesoft Placement</h3>
             <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
               Developed an AI-driven software solution to diverge and sort data packets, automatically filtering corrupted data from valid streams to improve network efficiency.
             </p>
          </div>

          <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
             <h3 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>T-Levels Completed</h3>
             <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
               Achieved Distinction in Software Development T-Levels, mastering Full Stack principles, OOP, and agile methodologies.
             </p>
          </div>

        </div>
      </section>

      {/* Languages Carousel */}
      <section id="languages">
        <Carousel />
      </section>
    </div>
  );
}