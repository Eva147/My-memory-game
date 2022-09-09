import React from "react"
import {Routes, Route} from "react-router-dom";
import './App.css';

// page components
import Home from './pages/home/Home'
import Game from './pages/game/Game'
import End from './pages/end/End'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </div>
  );
}


export default App;
