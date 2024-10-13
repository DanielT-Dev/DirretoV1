import React, { useState } from 'react'
import "../styles/Auth.css"

import { useNavigate } from 'react-router-dom'

import { account, getAllDocuments, ID } from '../lib/appwrite';

import { useAuth } from '../AuthContext';

const LogIn = () => {

    const databaseId = '6704fcb7000a5b637f96';
    const collectionId = '6705382c003c45dd9f1a';

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    async function handle_login(email, password) {
        await account.createEmailPasswordSession(email, password);
        
        //Get user from Appwrite
        const user = await account.get()

        //Save user in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        const user_info = await getAllDocuments(databaseId, collectionId);

        localStorage.setItem("user_info", JSON.stringify(user_info.filter(u => u.email == user.email)[0]))

        login(user);

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
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={() => handle_login(email, password)}
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