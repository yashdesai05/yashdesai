import { Github, Linkedin, Mail } from 'lucide-react';
import { useCursor } from '../CursorContext';
import { data } from '../data';

const Footer = () => {
  const { hoverEnter, hoverLeave } = useCursor();

  return (
    <footer id="contact" className="py-24 px-8 mt-32 border-t border-white/5 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="reveal-text text-[clamp(2.5rem,6vw,4rem)] font-semibold mb-4">Get in Touch</h2>
          <p className="text-secondary text-lg">{data.location}</p>
        </div>
        
        <div className="flex gap-6 mb-2">
          <a 
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-primary hover:text-accent transition-colors cursor-none transform hover:-translate-y-1"
            onMouseEnter={() => hoverEnter('hover')} 
            onMouseLeave={hoverLeave}
          >
            <Linkedin size={36} />
          </a>
          <a 
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-primary hover:text-accent transition-colors cursor-none transform hover:-translate-y-1"
            onMouseEnter={() => hoverEnter('hover')} 
            onMouseLeave={hoverLeave}
          >
            <Github size={36} />
          </a>
          <a 
            href={`mailto:${data.email}`}
            aria-label="Email"
            className="text-primary hover:text-accent transition-colors cursor-none transform hover:-translate-y-1"
            onMouseEnter={() => hoverEnter('hover')} 
            onMouseLeave={hoverLeave}
          >
            <Mail size={36} />
          </a>

        </div>
      </div>
      
      <div className="mt-20 pt-8 flex flex-col sm:flex-row justify-between text-secondary gap-4">
        <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        <p>Designed with minimal aesthetic & Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
