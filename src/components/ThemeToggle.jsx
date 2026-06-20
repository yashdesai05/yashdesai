import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useCursor } from '../CursorContext';

const ThemeToggle = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => hoverEnter('hover')}
      onMouseLeave={hoverLeave}
      className="fixed top-8 right-8 z-[999] p-4 rounded-full bg-surface/80 border border-border/40 backdrop-blur-md text-primary hover:text-accent shadow-lg cursor-none transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400 animate-[spin_10s_linear_infinite]" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
