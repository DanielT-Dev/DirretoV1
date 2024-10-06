import React from 'react'
import "../styles/Auth.css"

const LogIn = () => {
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
            <p style={{color: "rgb(100, 150, 255)", cursor: "pointer"}}>
                Go to Sign-Up
            </p>
        </div>
    </div>
  )
}

export default LogIn