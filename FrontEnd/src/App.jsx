import React from 'react'
import LandingPage from './Components/LandingPage'
import Signup from './Components/Signup'
import About from './Components/About';
import {  Route, Routes } from 'react-router-dom';
import Main from './Components/Main';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/main' element = {<Main/>}/>
      <Route path='/about' element = {<About/>}/>
    </Routes>
    </>
  )
}

export default App