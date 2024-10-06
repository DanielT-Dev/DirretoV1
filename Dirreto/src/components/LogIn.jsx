import React from 'react'
import "../styles/Auth.css"

import { useNavigate } from 'react-router-dom'

const LogIn = () => {
    const navigate = useNavigate()

  return (
    <div className="sign_up_container">
        <div className="sign_up_form">
            <h1>
                Dirreto
            </h1>
            <input 
                type="text"
                placeholder="Email"
            />
            <input 
                type="password"
                placeholder="Password"
            />
            <button>
                Log-In
            </button>
            <p>
                Don't have an account?
            </p>
            <p 
                style={{color: "rgb(100, 150, 255)", cursor: "pointer"}}
                onClick={() => navigate('/sign-up')}
            >
                Go to Sign-Up
            </p>
        </div>
    </div>
  )
}

export default LogIn