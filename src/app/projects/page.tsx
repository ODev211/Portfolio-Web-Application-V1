"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../components/Loader';

// Mock Data
const projects = [
  { 
    id: 1, title: "The Lost Souls", 
    desc: "A text-based adventure game made for offline gameplay.", 
    link: "https://github.com/yourusername/lost-souls",
    details: "Built using pure Python logic, this game explores complex narrative branching...",
    // Refers to public/projects/souls.png
    image: "/projects/souls.png" 
  },
  { 
    id: 2, title: "Flask Web App", 
    desc: "My very first application from a year ago.", 
    link: "https://github.com/yourusername/flask-app",
    details: "A CRUD application demonstrating HTTP requests and SQL.",
    image: "/projects/flask.png"
  },
  { 
    id: 3, title: "Chat Bot", 
    desc: "Uses a large JSON database to answer questions.", 
    link: "https://github.com/yourusername/chatbot",
    details: "Utilizes natural language processing logic to map user input.",
    image: "/projects/chatbot.png"
  },
];

// Inner Component to handle Search Params (Requires Suspense)
function ProjectsContent() {
  const searchParams = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Auto-open project if query param exists (e.g. ?open=Chat Bot)
  useEffect(() => {
    const projectToOpen = searchParams.get('open');
    if (projectToOpen) {
      const found = projects.find(p => p.title === projectToOpen);
      if (found) setSelectedProject(found);
    }
  }, [searchParams]);

  return (
    <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>My Projects</h1>
      
      {/* Grid of Rounded Glowing Cards */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2.5rem', padding: '20px' 
      }}>
        {projects.map((proj) => (
          <motion.div 
            key={proj.id} 
            layoutId={`card-${proj.id}`}
            className="project-card"
            onClick={() => setSelectedProject(proj)}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{proj.title}</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Click to view details</p>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000
          }} onClick={() => setSelectedProject(null)}>
            
            <motion.div 
              layoutId={`card-${selectedProject.id}`}
              className="glass"
              style={{
                width: '90%', maxWidth: '600px', padding: '30px', borderRadius: '25px',
                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="btn-close" 
                onClick={() => setSelectedProject(null)}>
              </button>

              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{selectedProject.title}</h2>
              
              {/* Placeholder Image Box */}
              <div style={{ 
                width: '100%', height: '200px', background: 'var(--code-bg)', 
                borderRadius: '15px', marginBottom: '20px', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', opacity: 0.5 
              }}>
                {/* Image Display */}
                <div style={{ 
                  width: '100%', height: 'auto', maxHeight: '300px',
                  background: 'var(--code-bg)', borderRadius: '15px', 
                  marginBottom: '20px', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {selectedProject.image ? (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-off">
                      <path d="M14.5 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.5"/>
                      <path d="m3 3 18 18"/>
                      <path d="M13.5 4v5.5h5.5"/>
                      <path d="M14 11.5c-1-1-2-2-3-3l-3.5 3.5"/>
                      <path d="m14 14 1 1"/>
                    </svg>
                  )}
                </div>
              </div>

              <p style={{ textAlign: 'center', lineHeight: '1.6', marginBottom: '20px' }}>
                {selectedProject.details}
              </p>

              <a href={selectedProject.link} target="_blank" className="btn-github">
                {/* SVG Github Icon */}
                <svg height="24" width="24" viewBox="0 0 16 16" fill="white">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                View Code on GitHub
              </a>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 5 Second Load timer
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <ProjectsContent />
    </Suspense>
  );
}