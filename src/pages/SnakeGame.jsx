import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCursor } from '../CursorContext';
import { ArrowLeft } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const gameLoopRef = useRef();

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Make sure food doesn't spawn on snake
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    generateFood();
  };

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
      default:
        break;
    }
  }, [direction, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { x: head.x + direction.x, y: head.y + direction.y };

      // Wall collision
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const speed = Math.max(50, INITIAL_SPEED - (Math.floor(score / 50) * 10)); // Gets faster
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnake, score]);

  return (
    <div className="min-h-screen bg-bg text-primary pt-12 px-8 flex flex-col items-center">
      <div className="w-full max-w-[800px] mb-12 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-secondary hover:text-accent transition-colors cursor-none"
          onMouseEnter={() => hoverEnter('hover')}
          onMouseLeave={hoverLeave}
        >
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Snake Matrix</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 w-full max-w-[600px] flex flex-col items-center"
      >
        <div className="w-full flex justify-between mb-8 text-xl font-mono text-accent">
          <span>SCORE: {score}</span>
          <span>{isPaused ? 'PAUSED' : 'PLAYING'}</span>
        </div>

        <div 
          className="relative bg-black/50 border-2 border-white/10 rounded-lg overflow-hidden"
          style={{ width: '400px', height: '400px' }}
        >
          {/* Grid lines optional 
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/5" />
            ))}
          </div>
          */}

          {/* Food */}
          <div 
            className="absolute bg-red-500 rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            style={{ 
              width: `${100 / GRID_SIZE}%`, 
              height: `${100 / GRID_SIZE}%`,
              left: `${(food.x / GRID_SIZE) * 100}%`,
              top: `${(food.y / GRID_SIZE) * 100}%`
            }}
          />

          {/* Snake */}
          {snake.map((segment, i) => (
            <div 
              key={i}
              className={`absolute rounded-sm ${i === 0 ? 'bg-accent z-10' : 'bg-white/80'} shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
              style={{
                width: `${100 / GRID_SIZE}%`, 
                height: `${100 / GRID_SIZE}%`,
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`
              }}
            />
          ))}

          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20">
              <h2 className="text-4xl text-red-500 font-bold mb-2">GAME OVER</h2>
              <p className="text-xl mb-6">Final Score: {score}</p>
              <button 
                onClick={resetGame}
                className="px-6 py-2 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-transform cursor-none"
                onMouseEnter={() => hoverEnter('hover')}
                onMouseLeave={hoverLeave}
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-secondary text-sm flex gap-6">
          <p>Use <span className="text-accent font-bold">Arrow Keys</span> to move</p>
          <p>Press <span className="text-accent font-bold">Space</span> to pause</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SnakeGame;
