import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// styles
import './Home.css'

export default function Game() {

  const navigate = useNavigate()

  const [clicked, setClicked] = useState(false)

  function handleClick() {
    setClicked(true)
  }
  useEffect(() => {
    clicked && navigate('/game')
  }, [clicked])

    return (
        <div className='home'>
          <button onClick={handleClick}>New Game</button> 
        </div>
    );
}