import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {'src': '/img/pink.png'},
  {'src': '/img/purple.png'},
  {'src': '/img/rainbow.png'},
  {'src': '/img/rose.png'},
  {'src': '/img/sunflower.png'},
  {'src': '/img/white_rose.png'}
]

function App() {
 // cards for game
  const [cards, setCards] = useState([])
// player's turns
  const [turns, setTurns] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    // we need to take each card twice, so we have 12 cards in total
    const shuffledCards = [...cardImages, ...cardImages]
    // sort images to mix them up
    .sort(() => Math.random() - 0.5)
    .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }
  console.log(cards, turns);

  return (
    <div className="App">
      <h1>My Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          < SingleCard 
            key={card.id}
            card={card} 
          />
        ))}
      </div>

    </div>
  );
}

export default App;
