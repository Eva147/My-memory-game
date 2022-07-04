import { useEffect, useState, useCallback } from 'react';
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
  // levels
  const [level, setLevel] = useState(0)
  // player's turns
  const [turns, setTurns] = useState(0)
  // Cards which user choose
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  // add disabled state to prevent multiple choices at the same time
  const [disabled, setDisabled] = useState(false)


  // shuffle cards
  const shuffleCards = useCallback(() => {
    // take from cardImages array (level + 1) images
    //let amountOfCards = level + 1
    let levelCards = cardImages.slice(0,level + 1)
    // take each card twice
    const shuffledCards = [...levelCards, ...levelCards]
    // mix them up
    .sort(() => Math.random() - 0.5)
    .map(card => ({ ...card, id: Math.random() }))

    // just in case if one card was already chosen before
    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  }, [level])
  
//////////////////////////////                   START

  const startGame = () => {
    setLevel(1)
  }

  useEffect(() => shuffleCards(), [level]);

/////////////////////////////                  CHOICE

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
      setDisabled(true)
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
        setTimeout (() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  // check if all cards have matched === true
  const checkMatches = (card) => {
    if(card.matched === true) {
      return true
    }
  }

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

////////////////////////////////             NEXT LEVEL

  // go to the next level
  useEffect(() => {
    if (level < 5) {
      if (cards.length !==0 && cards.every(checkMatches)) {
        setLevel(prevLevel => prevLevel + 1)
        setCards(prevCards => {
          return prevCards.map(card => {return {...card, matched: false }})
        })
      }
    } else if (level === 5) {
      if (cards.length !==0 && cards.every(checkMatches)) {
        console.log('Game over')
      }
    }
    
  }, [cards, level])


///////////////////////////////////         END OF THE GAME

// useEffect(() => {
//   if (level === 5) {
//     if(cards.every(checkMatches)) {
//       console.log('Game over')
//     }
//   }
// }, [level, cards])


  return (
    <div className="App">
      <h1>My Memory Game</h1>
      <h3>level {level}</h3>
      <button onClick={startGame}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
