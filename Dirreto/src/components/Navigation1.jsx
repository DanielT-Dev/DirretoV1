import React from 'react'

import { useNavigate } from 'react-router-dom'

const Navigation1 = () => {

  const navigate = useNavigate()

  return (
    <div className="navigation_container">
        <h1 className="navigation_logo">
            Dirreto
        </h1>
        <p>
            Solutions
            <img src="/dropdown1.png"/>
        </p>
        <p>
            Product
            <img src="/dropdown1.png"/>
        </p>
        <p>
            Why Dirreto?
            <img src="/dropdown1.png"/>
        </p>
        <p>
            Documentation
            <img src="/dropdown1.png"/>
        </p>
        <p>
            Pricing
        </p>
        <p className="navigation_gap">
            
        </p>
        <p style={{paddingRight: "1vw"}}>
            <img 
                src="/globe2.png"
                style={{
                    width: "1.2vw",
                    marginRight: "0.5vw",
                }}
            />
            EN
        </p>
        <p onClick={() => navigate('/log-in')}>
            Log-In
        </p>
        <p 
            class="navigation_special"
            onClick={() => navigate('/sign-up')}
        >
            Sign-Up for free
        </p>
    </div>
  )
}

export default Navigation1