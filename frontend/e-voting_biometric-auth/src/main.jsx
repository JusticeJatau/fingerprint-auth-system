import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Scan from './components/Scan.jsx'
import Match from './components/Match.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './components/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },{
    path: '/scan',
    element: <Scan/>
  },{
    path: '/match',
    element: <Match/>
  },{
    path: '/login',
    element: <Login/>
  },{
    path: '/signup',
    element: <Signup/>
  },{
    path: '/dashboard',
    element: <Dashboard/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
