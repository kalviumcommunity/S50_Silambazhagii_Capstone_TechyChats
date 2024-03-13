import React from 'react'
import LandingPage from './Components/LandingPage'
import Signup from './Components/Signup'
import {  Route, Routes } from 'react-router-dom';
import Main from './Components/Main';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/main' element = {<Main/>}/>
    </Routes>
    </>
  )
}

export default App