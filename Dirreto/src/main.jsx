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
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from './AuthContext';
import Teams from './components/Teams.jsx';
import Project from './components/Project.jsx';


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
    path: "/projects",
    element: 
    <ProtectedRoute>
      <Home/>
    </ProtectedRoute>,
  },
  {
    path: "/project/:id",
    element: 
    <ProtectedRoute>
      <Project/>
    </ProtectedRoute>,
  },
  {
    path: "/teams",
    element: 
    <ProtectedRoute>
      <Teams/>
    </ProtectedRoute>,
  },
  {
    path: "/account",
    element: 
    <ProtectedRoute>
      <Account/>
    </ProtectedRoute>,
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
