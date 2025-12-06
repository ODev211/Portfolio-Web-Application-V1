"use client";
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 5 Second Load timer
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ paddingTop: '150px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Me</h1>
      <div className="glass" style={{ padding: '2rem', borderRadius: '20px', minHeight: '300px' }}>
        <p style={{ opacity: 0.7, fontSize: '1.2rem' }}>[PLACEHOLDER TEXT]</p>
        <p style={{ marginTop: '20px' }}>
          I will update this section with my personal biography, education details, and career goals.
        </p>
      </div>
    </div>
  );
}