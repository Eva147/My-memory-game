import React from "react"
import {Routes, Route} from "react-router-dom";
import './App.css';

// page components
import Home from "./pages/Home"
import Game from "./pages/Game"
import Navbar from './components/Navbar'

function App() {



  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </div>
  );
}

export default App;
