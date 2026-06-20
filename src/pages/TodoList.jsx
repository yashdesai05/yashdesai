import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCursor } from '../CursorContext';
import { ArrowLeft, Check, Trash2, Plus } from 'lucide-react';

const TodoList = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow_data');
    if (saved) return JSON.parse(saved);
    return [
      { id: Date.now() + 1, text: "Explore the new portfolio", completed: true },
      { id: Date.now() + 2, text: "Play a game of Snake Matrix", completed: false },
      { id: Date.now() + 3, text: "Contact Yash for a quick chat", completed: false }
    ];
  });
  
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem('taskflow_data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([{ id: Date.now(), text: input.trim(), completed: false }, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120
  };

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
        <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 w-full max-w-[600px]"
      >
        <form onSubmit={addTask} className="relative mb-10">
          <input 
            type="text" 
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-lg focus:outline-none focus:border-white/30 transition-colors placeholder:text-secondary cursor-none"
            onMouseEnter={() => hoverEnter('hover')}
            onMouseLeave={hoverLeave}
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-3 top-3 bottom-3 aspect-square bg-accent text-bg rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-none hover:scale-105 transition-transform"
            onMouseEnter={() => hoverEnter('hover')}
            onMouseLeave={hoverLeave}
          >
            <Plus size={24} />
          </button>
        </form>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {tasks.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-center text-secondary py-8"
              >
                All tasks completed. Time to relax.
              </motion.p>
            ) : (
              tasks.map(task => (
                <motion.div 
                  key={task.id}
                  layout
                  transition={spring}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
                  className="group flex justify-between items-center bg-white/5 border border-white/5 hover:border-white/15 p-4 rounded-2xl transition-all cursor-none"
                  onMouseEnter={() => hoverEnter('hover')}
                  onMouseLeave={hoverLeave}
                >
                  <div 
                    className="flex items-center gap-4 flex-1 cursor-none"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`w-6 h-6 rounded-full border flex flex-shrink-0 items-center justify-center transition-colors ${
                      task.completed ? 'bg-accent border-accent text-bg' : 'border-secondary border-dashed border-2'
                    }`}>
                      {task.completed && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={`text-lg transition-all ${
                      task.completed ? 'text-secondary line-through' : 'text-primary'
                    }`}>
                      {task.text}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-none p-2 rounded-lg hover:bg-white/5"
                    onMouseEnter={() => hoverEnter('hover')}
                    onMouseLeave={hoverLeave}
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 text-sm text-secondary flex justify-between border-t border-white/10 pt-6">
          <p>{tasks.filter(t => !t.completed).length} items remaining</p>
          <button 
            onClick={() => setTasks(tasks.filter(t => !t.completed))}
            className="hover:text-primary transition-colors cursor-none"
            onMouseEnter={() => hoverEnter('hover')}
            onMouseLeave={hoverLeave}
          >
            Clear completed
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TodoList;
