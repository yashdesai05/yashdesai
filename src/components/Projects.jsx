import { useCursor } from '../CursorContext';
import { data } from '../data';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const ProjectRow = ({ project, index, isHovered }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      gsap.to(titleRef.current, {
        x: 40,
        skewX: -5,
        duration: 0.6,
        ease: "power3.out"
      });
      gsap.to(descRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    } else {
      gsap.to(titleRef.current, {
        x: 0,
        skewX: 0,
        duration: 0.6,
        ease: "power3.out"
      });
      gsap.to(descRef.current, {
        opacity: 0.4,
        x: -20,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  }, [isHovered]);

  return (
    <>
      <div className="flex items-start md:items-center gap-8 md:gap-16 w-full xl:w-2/3">
        <span className="text-2xl md:text-4xl text-secondary font-mono font-bold w-12 md:w-24 opacity-30 group-hover:opacity-100 transition-opacity duration-500 mt-2 md:mt-0 pt-2 selection:bg-transparent">
          0{index + 1}
        </span>
        <div className="overflow-hidden">
          <h3 
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-primary group-hover:text-accent uppercase break-words xl:whitespace-nowrap leading-[0.9]"
          >
            {project.name}
          </h3>
        </div>
      </div>

      <div 
        ref={descRef}
        className="w-full xl:w-1/3 flex flex-col justify-end xl:pl-12 opacity-40 -translate-x-5"
      >
        <p className="text-lg md:text-2xl text-secondary leading-relaxed mb-8 font-light">
          {project.description}
        </p>
        <span className="text-accent uppercase tracking-widest text-sm font-bold flex items-center gap-4">
          Explore Project 
          <span className="text-2xl inline-block transition-transform group-hover:translate-x-2">→</span>
        </span>
      </div>
    </>
  );
};

const Projects = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const floatingImageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hoveredIndex !== null) {
        gsap.to(floatingImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredIndex]);

  return (
    <section id="projects" ref={containerRef} className="py-32 w-full relative bg-bg">
      {/* Floating Image Follower */}
      <div 
        ref={floatingImageRef}
        className="fixed top-0 left-0 w-80 h-48 pointer-events-none z-[100] overflow-hidden rounded-lg opacity-0"
        style={{ 
          transform: "translate(-50%, -50%) scale(0.5)",
          visibility: hoveredIndex !== null ? 'visible' : 'hidden'
        }}
      >
        <div className="w-full h-full relative">
          {data.projects.map((project, i) => (
            <img 
              key={i}
              src={project.image} 
              alt={project.name} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-end mb-24">
        <h2 className="reveal-text text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter font-bold uppercase relative">
          <span className="text-stroke-2 text-transparent">Selected</span><br/>
          Projects
        </h2>
        <div className="text-secondary tracking-widest uppercase text-sm font-semibold mt-8 md:mt-0 flex items-center gap-4">
          <span className="w-16 h-[1px] bg-accent"></span>
          Interact to explore
        </div>
      </div>

      <div className="w-full border-t border-border/60 flex flex-col items-center">
        {data.projects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <div 
              key={index}
              className="w-full border-b border-border/60 relative group cursor-none overflow-hidden"
              onMouseEnter={() => {
                setHoveredIndex(index);
                hoverEnter('project', 'View');
                gsap.to(floatingImageRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.4,
                  ease: "back.out(1.7)"
                });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                hoverLeave();
                gsap.to(floatingImageRef.current, {
                  opacity: 0,
                  scale: 0.5,
                  duration: 0.4,
                  ease: "power2.in"
                });
              }}
            >
              <div className="absolute inset-0 bg-accent/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {project.isExternal ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full px-8 py-16 max-w-[1400px] mx-auto relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12 group">
                  <ProjectRow project={project} index={index} isHovered={isHovered} />
                </a>
              ) : (
                <Link to={project.link} className="block w-full px-8 py-16 max-w-[1400px] mx-auto relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12 group">
                  <ProjectRow project={project} index={index} isHovered={isHovered} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
