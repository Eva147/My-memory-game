import {Routes, Route} from "react-router-dom";

import './App.css';

// page components
import Home from "./pages/Home"
import Game from "./pages/Game"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
      <div className='footer_name'>
        <p>Created by Eugenie S.</p>
      </div>
    </>
  );
}

export default App;
