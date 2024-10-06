import React from 'react'
import "../styles/SignUp.css"

const SignUp = () => {
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
                Sign-Up
            </button>
            <p>
                Already have an account?
            </p>
            <p style={{color: "rgb(100, 150, 255)", cursor: "pointer"}}>
                Go to Log-In
            </p>
        </div>
    </div>
  )
}

export default SignUp