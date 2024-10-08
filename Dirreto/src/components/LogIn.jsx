import React, { useState } from 'react'
import "../styles/Auth.css"

import { useNavigate } from 'react-router-dom'

import { account, ID } from '../lib/appwrite';

const LogIn = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(email, password) {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
    }

  return (
    <div className="sign_up_container">
        <div className="sign_up_form">
            <h1>
                Dirreto
            </h1>
            <input 
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={() => login(email, password)}
            >
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