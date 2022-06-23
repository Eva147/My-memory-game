import { useState } from 'react';
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
          <div className='card' key={card.id}>
            <div>
              <img className='front' src={card.src} alt='card front' />
              <img className='back' src='img/wallpapers.png' alt='card back' />
            </div>
          </div>
        )) }
      </div>

    </div>
  );
}

export default App;
