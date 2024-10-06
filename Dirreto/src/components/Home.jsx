import React from 'react'

import "../styles/Home.css"

import Navigation2 from './Navigation2'
import Projects from './Projects'

const Home = () => {
  return (
    <div className="home_container">
        <Navigation2/>
        <Projects/>
    </div>
  )
}

export default Home