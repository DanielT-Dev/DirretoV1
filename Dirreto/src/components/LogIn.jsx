import React, { useState } from 'react'
import "../styles/Auth.css"

import { useNavigate } from 'react-router-dom'

import { account, getAllDocuments, ID } from '../lib/appwrite';

import { useAuth } from '../AuthContext';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { jwtDecode } from 'jwt-decode';

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

    const handleLoginSuccess = (response) => {
        const token = response.credential;
        // Decode the token to get user info
        const userInfo = jwtDecode(token);
        console.log("User Info:", userInfo);
        // You can also send this info to your backend here
      };
    
      const handleLoginFailure = () => {
        console.log("Login Failed");
      };
    

  return (
    <div className="sign_up_container">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
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
                <div className="SSO1">
                    <p>
                        Or
                    </p>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                        theme="filled_blue"
                    />
                </div>
                
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
        </GoogleOAuthProvider>
    </div>
  )
}

export default LogIn