import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../CursorContext';
import { data } from '../data';

const MarqueeRow = ({ items, reverse = false, speed = 60 }) => {
  const { hoverEnter, hoverLeave } = useCursor();
  // Duplicating items to simulate infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="flex w-[800vw] md:w-[400vw] lg:w-[200vw] overflow-hidden group py-4 relative left-1/2 -ml-[400vw] md:-ml-[200vw] lg:-ml-[100vw]">
      <motion.div
        className="flex gap-6 whitespace-nowrap pl-6"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
      >
        {duplicatedItems.map((item, index) => (
          <div 
            key={index}
            className="bg-surface border border-border/60 px-10 py-5 rounded-full text-center font-medium text-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-surface/80 hover:scale-110 hover:-translate-y-2 hover:border-accent hover:text-accent cursor-none shadow-sm hover:shadow-lg backdrop-blur-md"
            onMouseEnter={() => hoverEnter('hover')} 
            onMouseLeave={hoverLeave}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax subtle effect on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Combine smaller arrays for a longer marquee text flow
  const comboSkills = [...data.skills.tools, ...data.skills.strengths];

  return (
    <section ref={containerRef} className="pt-16 pb-32 w-full overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-8 mb-16">
        <h2 className="reveal-text text-[clamp(2rem,5vw,4rem)] font-semibold mb-4">Technical Arsenal</h2>
        <p className="text-secondary text-xl reveal-text max-w-2xl">
          A toolkit crafted for performance, beautiful animations, and modern capabilities.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full">
        {/* Layer 1 - primary tech stack scrolling left */}
        <motion.div style={{ y: y1 }}>
          <MarqueeRow items={data.skills.technical} speed={40} />
        </motion.div>
        
        {/* Layer 2 - secondary skills/tools scrolling right (reverse) */}
        <motion.div style={{ y: y2 }}>
          <MarqueeRow items={comboSkills} reverse={true} speed={45} />
        </motion.div>
      </div>

      {/* Decorative gradient blur in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent/5 blur-[150px] pointer-events-none rounded-full z-[-1]" />
    </section>
  );
};

export default Skills;
