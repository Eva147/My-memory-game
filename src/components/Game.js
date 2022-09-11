import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleCard from '../components/SingleCard';
// styles
import './Game.css'


const cardImages = [
    { 'src': '/img/pink.png', matched: false },
    { 'src': '/img/purple.png', matched: false },
    { 'src': '/img/rainbow.png', matched: false},
    { 'src': '/img/rose.png', matched: false },
    { 'src': '/img/sunflower.png', matched: false },
    { 'src': '/img/white_rose.png', matched: false }
]

export default function Game() {
    const navigate = useNavigate()
    // cards for game
    const [cards, setCards] = useState([])
    // levels
    const [level, setLevel] = useState(1)
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

    function createMarkup() {
        if (level < 5) {
            return {__html: 'Next level'}
        } else {
            return {__html: 'See results'}
        }
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
  
  ////////////////////////////////     NEXT LEVEL //////////// END OF THE GAME
  
    // go to the next level
    function handleNextLevel() {
      if (level < 5) {
        if (cards.length !==0 && cards.every(checkMatches)) {
          setLevel(prevLevel => prevLevel + 1)
          setCards(prevCards => {
            return prevCards.map(card => {return {...card, matched: false }})
          })
        }
      } else if (level === 5) {
        if (cards.length !==0 && cards.every(checkMatches)) {
            navigate('/end')
        }
      } 
    }

    return (
        <div className='game'>
            <h3>level {level}</h3>
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
            <button dangerouslySetInnerHTML={createMarkup()} onClick={handleNextLevel} />
        </div>
    )
}