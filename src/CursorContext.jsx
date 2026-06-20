import { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const hoverEnter = (variant = 'hover', text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const hoverLeave = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, hoverEnter, hoverLeave, cursorText }}>
      {children}
    </CursorContext.Provider>
  );
};
