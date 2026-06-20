import { useCursor } from '../CursorContext';
import { AlignRight } from 'lucide-react';

const Navbar = () => {
  const { hoverEnter, hoverLeave } = useCursor();

  return (
    <nav className="fixed top-0 w-full py-6 z-[100] backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <div 
          className="font-bold text-2xl tracking-tighter cursor-none"
          onMouseEnter={() => hoverEnter('hover')}
          onMouseLeave={hoverLeave}
        >
          YD
        </div>
        <div className="hidden md:flex gap-8">
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-secondary hover:text-accent transition-colors cursor-none"
              onMouseEnter={() => hoverEnter('hover')}
              onMouseLeave={hoverLeave}
            >
              {item}
            </a>
          ))}
        </div>
        <AlignRight className="md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;
