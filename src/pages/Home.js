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
  }, [clicked, navigate])

    return (
      <div className='home'>
        <img src='/img/main_page_image.png' className='main_image' alt='main_image'></img>
        <h1 className="title">Doggie's Memory Game</h1>
        <button onClick={handleClick}>New Game</button>
      </div>
    );
}