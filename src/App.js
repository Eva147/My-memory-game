import {Routes, Route} from "react-router-dom";

// page components
import Home from "./pages/Home"
import Game from "./pages/Game"
import End from "./pages/End"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/end" element={<End/>} />
      </Routes>
  );
}

export default App;
