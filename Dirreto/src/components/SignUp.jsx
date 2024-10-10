import React, { useState } from 'react'
import "../styles/Auth.css"

import { useNavigate } from 'react-router-dom'

import { account, ID } from '../lib/appwrite';

const SignUp = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(email, password) {
        await account.createEmailPasswordSession(email, password);

        //Get user from Appwrite
        const user = await account.get()

        //Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        if(user)
            navigate('/projects');
    }

  return (
    <div className="sign_up_container">
        <div className="sign_up_form">
            <h1>
                Dirreto
            </h1>
            <input 
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
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
                onClick={async () => {
                    try {
                      await account.create(ID.unique(), email, password, username, "");
                      await login(email, password);
                    } catch (error) {
                      console.error("Error creating user:", error.message);
                      // You can also display this error to the user via state
                    }
                  }}
            >
                Sign-Up
            </button>
            <p>
                Already have an account?
            </p>
            <p 
                style={{color: "rgb(100, 150, 255)", cursor: "pointer"}}
                onClick={() => navigate('/log-in')}
            >
                Go to Log-In
            </p>
        </div>
    </div>
  )
}

export default SignUp