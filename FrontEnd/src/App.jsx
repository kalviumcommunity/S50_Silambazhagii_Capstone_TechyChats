import React from 'react'
import LandingPage from './Components/LandingPage'
import Signup from './Components/Signup'
import {  Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import About from "./Components/About"
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      {/* <Route path='/main' element = {<Main/>}/> */}
      <Route path='/about' element = {<About/>}/>
      <Route path='/main' element={<MainPage />} />
    </Routes>
    {/* <HTML/> */}
    </>
  )
}

export default App