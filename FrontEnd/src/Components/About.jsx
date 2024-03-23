import React from 'react';
import ParticleApp from '../utilities/particleGen';
import './app.css'

function About() {
  return (
    <>
      <div className='particle-container'>
        <ParticleApp />
        <div className='content text-white'>
          About
        </div>
      </div>
    </>
  );
}

export default About;
