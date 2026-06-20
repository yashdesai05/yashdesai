import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CursorProvider } from './CursorContext.jsx'
import Cursor from './components/Cursor.jsx'

import App from './App.jsx'
import SnakeGame from './pages/SnakeGame.jsx'
import TodoList from './pages/TodoList.jsx'
import HotelMenu from './pages/HotelMenu.jsx'
import KineticScroll from './pages/KineticScroll.jsx'
import Magnetism from './pages/Magnetism.jsx'
import TabManager from './components/TabManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CursorProvider>
      <Cursor />
      <BrowserRouter>
        <TabManager />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/menu" element={<HotelMenu />} />
          <Route path="/kinetic" element={<KineticScroll />} />
          <Route path="/magnetism" element={<Magnetism />} />
        </Routes>
      </BrowserRouter>
    </CursorProvider>
  </StrictMode>,
)
