import React from 'react'
import Navigation1 from './Navigation1'

const Welcome = () => {
  return (
    <div className="welcome_container">
      <Navigation1/>
      <h1 className="welcome_message">
        Ready to &nbsp;
        <span style={{
          textDecoration: "underline",
          textDecorationColor: "rgb(250, 200, 100)",
          textDecorationThickness: "1.2vh",
        }}>
          direct
        </span> your projects to success?
      </h1>
      <p className="welcome_recomend">
        <img src="/quotes1.png"/>
        I’ve never seen a platform as easy to use, as easy to onboard new users, as easy to scale, and as easy to customize to your own workflow, process, team, clientele, and changing environment.
       <img src="/quotes1.png"/>
      </p>
      <img 
        className="welcome_art"
        src="/welcome2.png"
      />
    </div>
  )
}

export default Welcome