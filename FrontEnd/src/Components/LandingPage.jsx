import React from 'react'
import './app.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
<>
<div className='body1 justify-center items-center text-center h-screen'>
      <nav className=' flex justify-between text-white font-semibold text-lg px-7'>
        <div className=' text-2xl mt-7 ml-7'>TechyChats</div>
        <div>
        <Link to='./about'>
          <button className='mr-7 mt-3'>About
          </button>
          </Link>
        <Link to = '/signup'>
        <button>Signup</button>
        </Link>
        </div>
      </nav>
      <div className='text-white text-7xl text- text-center item-center mt-32'>Where Tech Enthusiasts Connect
      <br/>
       and Explore.</div>
    <button className='bg-white px-16 font-semibold rounded-md mt-48 py-3'>Get Started</button>
    </div>
</>
  )
}

export default LandingPage
