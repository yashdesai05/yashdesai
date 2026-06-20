import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Magnetism = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const distanceX = clientX - cardX;
        const distanceY = clientY - cardY;
        
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const radius = 300;
        
        if (distance < radius) {
          const power = (radius - distance) / radius;
          const moveX = (distanceX / radius) * 50 * power;
          const moveY = (distanceY / radius) * 50 * power;
          const rotateX = (distanceY / radius) * 20 * power;
          const rotateY = -(distanceX / radius) * 20 * power;
          
          gsap.to(card, {
            x: moveX,
            y: moveY,
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.4,
            ease: "power2.out"
          });
        } else {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cardData = [
    {
      id: 1,
      title: "Gravity Field",
      desc: "Hover near this card to see it react to your cursor position with smooth GSAP interpolation.",
      glowClass: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
      circleClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      barClass: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Quantum Flux",
      desc: "Feel the push and pull attraction force as your mouse orbits this component's center point.",
      glowClass: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
      circleClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      barClass: "bg-gradient-to-r from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      title: "Thermal Wave",
      desc: "Experience smooth multi-axis perspective rotation that follows your gaze in real-time.",
      glowClass: "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]",
      circleClass: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      barClass: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  const MagneticButton = ({ children, className }) => {
    const btnRef = useRef(null);

    useEffect(() => {
      const btn = btnRef.current;
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const handleLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      return () => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      };
    }, []);

    return (
      <button 
        ref={btnRef} 
        className={`px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm relative overflow-hidden group shadow-lg cursor-none text-white ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
      </button>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-bg text-primary flex flex-col items-center justify-center p-8 overflow-hidden transition-colors duration-500">
      <Link to="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-secondary hover:text-accent transition-colors">
        <ArrowLeft size={20} />
        <span className="uppercase tracking-widest text-xs font-bold">Back to Home</span>
      </Link>

      <div className="max-w-6xl w-full">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 uppercase">Magnetic Force</h1>
          <p className="text-secondary text-xl font-light">Interact with the cards and buttons to feel the GSAP magnetism.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 perspective-1000">
          {cardData.map((card, idx) => (
            <div 
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`h-[400px] bg-surface/40 border border-border/60 rounded-2xl backdrop-blur-xl p-8 flex flex-col justify-between group transition-all duration-500 ${card.glowClass}`}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold ${card.circleClass}`}>
                0{card.id}
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 uppercase tracking-tight">{card.title}</h3>
                <p className="text-secondary">{card.desc}</p>
              </div>
              <div className={`h-1 w-0 group-hover:w-full transition-all duration-700 ${card.barClass}`}></div>
            </div>
          ))}
        </div>

        <div className="mt-32 flex flex-wrap justify-center gap-12">
          <MagneticButton className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/20 hover:shadow-purple-500/40">
            Pull Me
          </MagneticButton>
          <MagneticButton className="bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-500/20 hover:shadow-cyan-500/40">
            Hover Here
          </MagneticButton>
          <MagneticButton className="bg-gradient-to-r from-orange-600 to-red-600 shadow-orange-500/20 hover:shadow-orange-500/40">
            Magnetic UI
          </MagneticButton>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-purple-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]"></div>
      </div>
    </div>
  );
};

export default Magnetism;
