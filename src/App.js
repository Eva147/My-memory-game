import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'src': '/img/pink.png', matched: false },
  { 'src': '/img/purple.png', matched: false },
  { 'src': '/img/rainbow.png', matched: false },
  { 'src': '/img/rose.png', matched: false },
  { 'src': '/img/sunflower.png', matched: false },
  { 'src': '/img/white_rose.png', matched: false }
]

function App() {
  // cards for game
  const [cards, setCards] = useState([])
  // player's turns
  const [turns, setTurns] = useState(0)
  // Cards which user choose
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

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
  
  // handle a choice
  const handleChoice = (card) => {
    // check if choiceOne has a value
    // if it hasn't then setChoiceOne
    // if it has then setChoiceTwo
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if (choiceOne.src === choiceTwo.src) {
        // return a new array of cards with changed matched property to true for matched cards
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        
        resetTurn()
      }

    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>My Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          < SingleCard 
            key={card.id}
            card={card} 
            handleChoice={handleChoice}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
