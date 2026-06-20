import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCursor } from '../CursorContext';
import { data } from '../data';
import avatarImg from '../assets/avatar.png'; // Assuming it exists here as placed earlier

const Hero = () => {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const { hoverEnter, hoverLeave } = useCursor();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  // Motion values to track absolute distance from center of card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-performance interpolation
  const springConfig = { damping: 25, stiffness: 250, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-15, 15]), springConfig);

  // Parallax move inside the card to make the face shift in 3D
  const imgTranslateX = useSpring(useTransform(mouseX, [-250, 250], [12, -12]), springConfig);
  const imgTranslateY = useSpring(useTransform(mouseY, [-250, 250], [12, -12]), springConfig);

  // Interactive glare background gradient coordinates
  const glareX = useSpring(useTransform(mouseX, [-250, 250], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-250, 250], [0, 100]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, [-250, 250], [0.1, 0.45]), springConfig);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([xVal, yVal]) => `radial-gradient(circle 220px at ${xVal}% ${yVal}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%)`
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate cursor relative to card center
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    hoverLeave();
  };

  return (
    <section 
      id="about" 
      ref={heroRef} 
      className="min-h-[85vh] flex items-center relative pt-32 pb-16"
    >
      <motion.div style={{ opacity, y }} className="max-w-[1200px] w-full mx-auto px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
          {/* Text Area */}
          <div className="flex-1 lg:flex-[1.2] text-center lg:text-left z-10">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-secondary text-lg mb-4 font-medium uppercase tracking-[3px]"
            >
              PORTFOLIO
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-primary"
            >
              Hi, I'm <br/>{data.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-[500px] mx-auto lg:mx-0 mb-12 text-xl leading-[1.8] text-secondary"
            >
              {data.summary}
            </motion.p>
            
            <motion.a 
              href="#contact" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-flex items-center gap-4 py-4 px-10 bg-accent text-bg rounded-full font-semibold transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] cursor-none"
              onMouseEnter={() => hoverEnter('hover')}
              onMouseLeave={hoverLeave}
            >
              Let's Talk <ArrowRight size={20} />
            </motion.a>
          </div>

          {/* Avatar Image Block */}
          <div className="flex-1 lg:flex-[0.8] flex justify-center lg:justify-end w-full perspective-[1200px]">
            <motion.div 
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d"
              }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[450px] aspect-[4/5] rounded-[24px] overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-none bg-surface/30 border border-white/10"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => hoverEnter('hover')}
              onMouseLeave={handleMouseLeave}
            >
              {/* Inner Parallax Image wrapper */}
              <motion.div
                style={{
                  x: imgTranslateX,
                  y: imgTranslateY,
                  scale: 1.1, // slightly scaled up so sliding doesn't show edges
                  transformStyle: "preserve-3d"
                }}
                className="w-full h-full"
              >
                <img 
                  src={avatarImg} 
                  alt="Yash Desai Avatar" 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{ filter: "contrast(1.1) brightness(0.95)" }}
                />
              </motion.div>

              {/* Dynamic 3D Shine / Glare overlay */}
              <motion.div 
                style={{
                  background: glareBackground,
                  opacity: glareOpacity,
                  mixBlendMode: "overlay",
                  pointerEvents: "none"
                }}
                className="absolute inset-0 z-20 pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
