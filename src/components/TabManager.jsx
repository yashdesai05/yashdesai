import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const TabManager = () => {
  const location = useLocation();
  const originalTitle = useRef("Yash Desai | Portfolio");

  useEffect(() => {
    // Map pathnames to appropriate page titles
    let title = "Yash Desai | Portfolio";
    switch (location.pathname) {
      case '/':
        title = "Yash Desai | Portfolio";
        break;
      case '/snake':
        title = "Snake Game 🐍 | Yash Desai";
        break;
      case '/todo':
        title = "Task Board 📋 | Yash Desai";
        break;
      case '/menu':
        title = "Hotel Menu 🍔 | Yash Desai";
        break;
      case '/kinetic':
        title = "Kinetic Scroll 🛹 | Yash Desai";
        break;
      case '/magnetism':
        title = "Magnetism Effects 🧲 | Yash Desai";
        break;
      default:
        title = "Yash Desai | Portfolio";
    }
    
    originalTitle.current = title;
    
    // Only update title if the document is visible
    if (!document.hidden) {
      document.title = title;
    }
  }, [location.pathname]);

  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    
    // Initialize favicon to active SVG
    if (favicon) {
      favicon.href = "/favicon-active.svg";
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Swap to inactive favicon and away title
        if (favicon) {
          favicon.href = "/favicon-inactive.svg";
        }
        document.title = "Don't leave yet... 💻";
      } else {
        // Swap back to active favicon and show welcome back title
        if (favicon) {
          favicon.href = "/favicon-active.svg";
        }
        
        document.title = "Welcome back! ✨";
        
        const timeout = setTimeout(() => {
          if (!document.hidden) {
            document.title = originalTitle.current;
          }
        }, 1500);

        return () => clearTimeout(timeout);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // Component does not render any visual UI elements
};

export default TabManager;
