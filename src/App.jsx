import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Context
import { CursorProvider } from './CursorContext';

// Components
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // GSAP Text Reveal Animation
    const titles = gsap.utils.toArray('.reveal-text');
    titles.forEach((title) => {
      gsap.fromTo(title, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <div className="relative bg-bg text-primary min-h-screen">
      <Navbar />
      
      <main className="w-full overflow-hidden">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}

export default App;
