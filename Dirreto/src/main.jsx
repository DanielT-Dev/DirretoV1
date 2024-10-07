import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from './components/Welcome.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import Home from './components/Home.jsx';
import Account from './components/Account.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/log-in",
    element: <LogIn/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/account",
    element: <Account/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
