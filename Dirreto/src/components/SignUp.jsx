import React, { useState } from 'react'
import "../styles/Auth.css"
import { useNavigate } from 'react-router-dom'
import { account, ID } from '../lib/appwrite';

const SignUp = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateUsername = (username) => {
        return username.trim().length > 0;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        if (!validateUsername(username)) {
            setUsernameError("Username cannot be empty");
            isValid = false;
        } else {
            setUsernameError("");
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            try {
                await account.create(ID.unique(), email, password, username, "");
                await login(email, password);
            } catch (error) {
                console.error("Error creating user:", error.message);
                // You can also display this error to the user via state
            }
        }
    };

    const login = async (email, password) => {
        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        localStorage.setItem("user", JSON.stringify(user));
        if (user) navigate('/projects');
    };

    return (
        <div className="sign_up_container">
            <div className="sign_up_form">
                <h1>Dirreto</h1>
                <p>Join Dirreto for free! Fill in the form with your information to get started.</p>
                
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <div className="error-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="error-icon" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM7.001 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1z"/>
                        </svg>
                        {usernameError}
                    </div>}

                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="error-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="error-icon" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM7.001 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1z"/>
                                    </svg>
                                    {emailError}
                                </div>}

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="error-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="error-icon" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM7.001 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm0 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1z"/>
                                    </svg>
                                    {passwordError}
                                </div>}

                <button onClick={handleSubmit}>
                    Sign-Up
                </button>

                <div className="info-link">
                    <p>Already have an account?</p>
                    <p 
                        style={{ color: "rgb(100, 150, 255)", cursor: "pointer" }}
                        onClick={() => navigate('/log-in')}
                    >
                        Go to Log-In
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
