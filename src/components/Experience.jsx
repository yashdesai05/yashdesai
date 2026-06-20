import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useCursor } from '../CursorContext';
import { data } from '../data';

const Experience = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 px-8 max-w-[1200px] mx-auto w-full relative" ref={containerRef}>
      <h2 className="reveal-text text-[clamp(2.5rem,6vw,5rem)] tracking-tight font-bold mb-20 text-center uppercase relative">
        <span className="text-stroke-2 text-transparent">Work</span> Experience
        <div className="absolute left-1/2 -bottom-4 w-24 h-1 bg-accent/50 -translate-x-1/2 rounded-full"></div>
      </h2>

      <div className="relative mt-20 max-w-4xl mx-auto">
        {/* Glowing vertical timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/40 md:-translate-x-1/2">
          <motion.div 
            style={{ scaleY: pathLength }}
            className="absolute top-0 left-0 right-0 h-full bg-accent origin-top shadow-md"
          />
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {data.experience.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                className={`relative flex items-center justify-between flex-col md:flex-row w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
                onMouseEnter={() => hoverEnter('hover')} 
                onMouseLeave={hoverLeave}
              >
                {/* Center Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-bg border-4 border-border/40 -translate-x-1/2 flex items-center justify-center z-10 transition-colors duration-500 group-hover:border-accent">
                  <div className="w-2 h-2 rounded-full bg-accent scale-0 transition-transform duration-500 group-hover:scale-100" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-5/12"></div>

                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-5/12 cursor-none">
                   <div 
                     className="bg-surface/80 backdrop-blur-md relative p-8 md:p-10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] border border-border/40 group-hover:border-border"
                   >
                     {/* Gradient hover background */}
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />
                     
                     <div className="relative z-10">
                       <div className="inline-block px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold tracking-wider mb-6 border border-border group-hover:bg-primary group-hover:text-bg transition-colors duration-300">
                         {exp.period}
                       </div>
                       
                       <h3 className="text-3xl font-bold text-primary mb-2 tracking-tight">{exp.role}</h3>
                       <h4 className="text-xl text-secondary font-medium tracking-wide mb-8">— {exp.company}</h4>
                       
                       <ul className="space-y-4 text-primary/70">
                         {exp.points.map((point, i) => (
                           <li key={i} className="relative pl-6 leading-relaxed group-hover:text-primary transition-colors duration-300">
                             <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-accent transition-colors duration-300"></span>
                             {point}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
