import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleCard from '../components/SingleCard';
// styles
import './Game.css'


const cardImages = [
    { 'src': '/img/pink.png', matched: false },
    { 'src': '/img/sunflower.png', matched: false },
    { 'src': '/img/white_rose.png', matched: false },
    { 'src': '/img/purple.png', matched: false },
    { 'src': '/img/rose.png', matched: false},
    { 'src': '/img/rainbow.png', matched: false}
]

let statistics = [];
const statLevels = [1, 2, 3];

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

    const [end, setEnd] = useState(false);

    // shuffle cards
    const shuffleCards = useCallback(() => {
      if (level === 1) {statistics = []}
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
        if (level < 3) {
            return {__html: 'Next level'}
        } else {
            return {__html: 'See results'}
        }
    }

    useEffect(() => shuffleCards(), [level, shuffleCards]);

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

  ////////////////////////////////     NEXT LEVEL /// END OF THE GAME     ////////////
    // go to the next level
    function handleNextLevel() {
      if (cards.every(checkMatches)) {
        statistics.push(turns)
      }
      if (level < 3) {
        if (cards.length !==0 && cards.every(checkMatches)) {
          setLevel(prevLevel => prevLevel + 1)
          setCards(prevCards => {
            return prevCards.map(card => {return {...card, matched: false }})
          })
        }
      } else if (level === 3) {
        if (cards.length !==0 && cards.every(checkMatches)) {
          setEnd(true);
        }
      }
    }

    return (
      <div className='wrapper'>
        {end
        ? (
          <div className='statisticsWrapper'>
            <div className='resultsData'>
              <h3>Your results:</h3>
              <div className='statData'>
                <div className='statLevel'>
                  {statLevels.map(lev => {
                    return (
                      <p>{`level ${lev}:`}</p>
                    )
                  })}
                </div>
                <div className='statResult'>
                  {statistics.map(stat => {
                    return (
                      <p>{`${stat} turns.`}</p>
                    )
                  })}
                </div>
              </div>
            </div>
            <button className='stat_button_main' onClick={() => navigate('/')}>Main page</button>
          </div>
        ) : (
          <div className='game'>
            <h3>Level {level}</h3>
            <div className='gameWrapper'>
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
              <div className='footer'>
                <p>Turns: {turns}</p>
                <div className='footerButtons'>
                  <button className='footer_button_main' onClick={() => navigate('/')}>Main page</button>
                  {cards.every(checkMatches) ?
                    <button dangerouslySetInnerHTML={createMarkup()} onClick={handleNextLevel} />
                  : null
                  }
                </div>

              </div>
            </div>
          </div>
        )}


      </div>
    )
}