import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../CursorContext';

const Cursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const { cursorVariant, cursorText } = useCursor();

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Smooth travel for outer cursor
      gsap.to(outerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out"
      });
      
      // Immediate travel for inner dot
      gsap.to(innerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    if (!outerRef.current) return;

    if (cursorVariant === 'hover' || cursorVariant === 'project') {
      gsap.to(outerRef.current, {
        width: cursorVariant === 'project' ? 100 : 80,
        height: cursorVariant === 'project' ? 100 : 80,
        backgroundColor: "white",
        mixBlendMode: "difference",
        border: "none",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(innerRef.current, {
        opacity: 0,
        duration: 0.2
      });
    } else {
      gsap.to(outerRef.current, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        mixBlendMode: "difference",
        border: "1px solid white",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(innerRef.current, {
        opacity: 1,
        duration: 0.2
      });
    }
  }, [cursorVariant]);

  return (
    <>
      <div 
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
      >
        {cursorText && (
          <span className="text-[10px] font-bold text-black uppercase tracking-tighter mix-blend-normal">
            {cursorText}
          </span>
        )}
      </div>
      <div 
        ref={innerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
};

export default Cursor;
