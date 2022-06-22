import './App.css';

const cardImages = [
  {'src': '/img/rose.png'},
  {'src': '/img/lavender.png'},
  {'src': '/img/pink.png'},
  {'src': '/img/rainbow.png'},
  {'src': '/img/white_rose.png'},
  {'src': '/img/yellow.png'}
]

function App() {
  return (
    <div className="App">
      <h1>My Memory Game</h1>
      <button>New Game</button>
    </div>
  );
}

export default App;
