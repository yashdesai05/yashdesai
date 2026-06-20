import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowDown, ExternalLink, Mail, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const KineticScroll = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalRef = useRef(null);
  const galleryRef = useRef(null);
  const textSectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Text Animation
      const heroChars = document.querySelectorAll('.hero-char');
      gsap.from(heroChars, {
        y: 200,
        skewY: 20,
        rotateX: -90,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out"
      });

      // 2. Horizontal Scroll Setup
      const sections = gsap.utils.toArray('.panel');
      let horizontalTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          start: "top top",
          end: () => "+=" + horizontalRef.current.offsetWidth
        }
      });

      // 3. Parallax for Horizontal Images
      sections.forEach((section) => {
        const bg = section.querySelector('.panel-bg');
        const content = section.querySelector('.panel-content');
        
        gsap.to(bg, {
          x: 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: horizontalTween,
            start: "left right",
            end: "right left",
            scrub: true
          }
        });

        gsap.to(content, {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: horizontalTween,
            start: "left right",
            end: "right left",
            scrub: true
          }
        });
      });

      // 4. Kinetic Typography Section
      const words = document.querySelectorAll('.kinetic-word');
      words.forEach((word) => {
        gsap.fromTo(word, 
          { x: (Math.random() - 0.5) * 500, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: word,
              start: "top 90%",
              end: "top 40%",
              scrub: true
            }
          }
        );
      });

      // 5. Image Reveal Grid
      const gridItems = gsap.utils.toArray('.grid-item');
      gridItems.forEach((item) => {
        gsap.from(item, {
          scale: 0.8,
          opacity: 0,
          y: 100,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: true
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const galleryItems = [
    { title: "Quantum", desc: "Digital particles in motion.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600" },
    { title: "Ether", desc: "Fluid dynamics and liquid transitions.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" },
    { title: "Neon", desc: "High-contrast geometric forms.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600" },
    { title: "Void", desc: "Negative space as a design element.", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1600" },
  ];

  return (
    <div ref={mainRef} className="bg-[#050505] text-white selection:bg-accent selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-[100] flex justify-between items-center mix-blend-difference">
        <Link to="/" className="flex items-center gap-2 group text-secondary hover:text-white transition-colors">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold font-mono">Exit Studio</span>
        </Link>
        <div className="flex gap-8">
          {['Vision', 'Works', 'Process', 'Connect'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="uppercase tracking-[0.3em] text-[10px] font-bold hover:text-accent transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-8">
        <h1 className="text-[clamp(4rem,18vw,15rem)] font-bold tracking-tighter leading-[0.85] uppercase text-center perspective-1000">
          <div className="overflow-hidden py-4">
            {"Kinetic".split("").map((char, i) => (
              <span key={i} className="hero-char inline-block">{char}</span>
            ))}
          </div>
          <div className="overflow-hidden py-4 text-accent">
            {"Studio".split("").map((char, i) => (
              <span key={i} className="hero-char inline-block">{char}</span>
            ))}
          </div>
        </h1>
        <div className="mt-12 flex flex-col items-center gap-4 opacity-40">
          <span className="uppercase tracking-[0.5em] text-xs font-bold">Scroll to Explore</span>
          <ArrowDown size={24} className="animate-bounce" />
        </div>
        
        {/* Background Ambient Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] blur-[120px]"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="vision" className="py-64 px-12 md:px-24 flex flex-col items-center">
        <div className="max-w-5xl">
          <h2 className="text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-12">Our Philosophy</h2>
          <div className="text-[clamp(1.5rem,5vw,4rem)] font-light leading-tight tracking-tight">
            {[
              "Design", "is", "not", "just", "how", "it", "looks.", 
              "Design", "is", "how", "it", "moves.", 
              "Every", "pixel", "has", "momentum.", 
              "Every", "interaction", "tells", "a", "story."
            ].map((word, i) => (
              <span key={i} className="kinetic-word inline-block mr-[0.3em] mb-[0.1em] opacity-0">
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Works Section */}
      <section id="works" ref={horizontalRef} className="overflow-hidden">
        <div className="flex h-screen w-[400%]">
          {galleryItems.map((item, i) => (
            <div key={i} className="panel w-screen h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center p-12 md:p-24">
              <div className="panel-bg absolute inset-0 opacity-40 -z-10 scale-125">
                <img src={item.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="panel-content grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
                <div className="space-y-8">
                  <span className="text-accent font-mono text-xl">0{i + 1}</span>
                  <h3 className="text-[clamp(3rem,10vw,8rem)] font-bold uppercase tracking-tighter leading-none">{item.title}</h3>
                  <p className="text-secondary text-xl md:text-2xl max-w-md font-light">{item.desc}</p>
                  <button className="px-8 py-4 border border-white/20 hover:border-accent hover:text-accent transition-all uppercase tracking-widest text-xs font-bold">
                    View Project
                  </button>
                </div>
                <div className="relative group perspective-1000">
                  <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-2xl border border-white/10">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Grid Section */}
      <section id="process" className="py-64 px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase tracking-tighter leading-none">
              A curated <br/><span className="text-accent">Process.</span>
            </h2>
            <p className="max-w-md text-secondary text-lg">
              We blend engineering precision with artistic movement to create digital experiences that feel alive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Conceptualization", d: "Mapping the movement of thought into digital space.", c: "bg-blue-500/10" },
              { t: "Kinetic Logic", d: "Defining the physics and momentum of every UI element.", c: "bg-purple-500/10" },
              { t: "Synthesis", d: "Harmonizing code and aesthetic into a unified flow.", c: "bg-accent/10" }
            ].map((step, i) => (
              <div key={i} className={`grid-item p-12 rounded-2xl border border-white/5 ${step.c} space-y-8 group hover:border-accent/30 transition-colors`}>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-accent text-sm font-bold">
                  0{i + 1}
                </div>
                <h4 className="text-3xl font-bold uppercase tracking-tighter">{step.t}</h4>
                <p className="text-secondary leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Contact Section */}
      <section id="connect" className="py-64 relative overflow-hidden bg-accent text-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="px-12 md:px-24 max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-[clamp(3rem,12vw,10rem)] font-bold uppercase tracking-tighter leading-none mb-12">
            Start the <br/>Momentum.
          </h2>
          <div className="flex flex-wrap justify-center gap-12 mt-24">
            <a href="mailto:hello@kinetic.studio" className="flex items-center gap-4 text-xl font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
              <Mail /> Get in touch
            </a>
            <div className="flex gap-8 items-center">
              <a href="#" className="p-4 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all"><Twitter size={24} /></a>
              <a href="#" className="p-4 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all"><Github size={24} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Footer */}
      <footer className="py-12 px-12 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-secondary text-xs uppercase tracking-[0.3em] font-medium">
        <div>© 2026 Kinetic Design Studio</div>
        <div className="flex gap-12">
          <a href="#" className="hover:text-accent">Privacy</a>
          <a href="#" className="hover:text-accent">Terms</a>
          <a href="#" className="hover:text-accent">Careers</a>
        </div>
        <div className="text-secondary/50">Crafted with GSAP</div>
      </footer>
    </div>
  );
};

export default KineticScroll;
