import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../CursorContext';
import { data } from '../data';
import { useRef } from 'react';

const EducationCard = ({ edu, index, progress, range, targetScale }) => {
  const { hoverEnter, hoverLeave } = useCursor();
  
  // Create a scaling down effect and fading effect as the next card scrolls over it
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.5]);
  
  // Dynamic positioning for the overlapping stack
  const top = `calc(15vh + ${index * 40}px)`;

  return (
    <div className="h-screen flex items-center justify-center sticky top-0" style={{ perspective: "1500px" }}>
      <motion.div 
        style={{ scale, top, opacity, transformOrigin: "top" }}
        className="relative w-full max-w-[1200px] bg-surface border border-border/80 rounded-[40px] p-10 md:p-20 overflow-hidden cursor-none shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
        onMouseEnter={() => hoverEnter('hover')}
        onMouseLeave={hoverLeave}
      >
        {/* Abstract glowing circular background shapes */}
        <div className={`absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${index % 2 === 0 ? 'bg-accent/10' : 'bg-primary/5'}`} />
        <div className={`absolute -left-32 -bottom-32 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none bg-primary/5`} />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 h-full">
           <div className="flex-1">
             <div className="flex items-center gap-8 mb-10">
                <span className="text-7xl md:text-8xl font-serif text-accent opacity-30 font-bold select-none">
                  0{index + 1}
                </span>
                <h3 className="text-5xl md:text-[5.5rem] leading-none font-bold tracking-tighter text-primary uppercase drop-shadow-lg">{edu.degree}</h3>
             </div>
             <p className="text-2xl md:text-4xl text-secondary font-light tracking-wide max-w-2xl leading-relaxed">
               {edu.institution}
             </p>
           </div>
           
           <div className="hidden md:flex w-40 h-40 rounded-full border border-border/60 items-center justify-center flex-shrink-0 relative">
             <div className="absolute inset-0 rounded-full border border-accent/30 animate-[spin_10s_linear_infinite]" />
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent hover:scale-125 transition-transform duration-500">
               <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
             </svg>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const Education = () => {
  const containerRef = useRef(null);
  
  // Tracking global scroll through the education container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="education" className="relative w-full bg-bg -mt-10">
      <div className="w-full max-w-[1400px] mx-auto px-8 pt-32 pb-8 sticky top-0 z-20 pointer-events-none">
        <h2 className="reveal-text text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter font-bold uppercase mix-blend-difference text-primary">
          <span className="text-stroke-2 text-transparent">My</span><br/>
          Education
        </h2>
      </div>

      {/* 
        The container height is calculated based on how many cards there are. 
        Because it's "sticky", it uses scroll progress over N vh.
      */}
      <div ref={containerRef} className="relative w-full px-8 pb-32 z-10" style={{ height: `${data.education.length * 100}vh` }}>
        {data.education.map((edu, index) => {
          // As index increases, the target scale shrinks proportionally 
          // to make older cards look smaller in the background
          const targetScale = 1 - ((data.education.length - index) * 0.05);
          
          return (
            <EducationCard 
              key={index}
              index={index}
              edu={edu}
              progress={scrollYProgress}
              // Adjust ranges to trigger sequentially
              range={[index * (1 / data.education.length), 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Education;
