import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Users from './component/Users.jsx';
import Update from './component/Update.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path:"/users",
    element: <Users></Users>,
    loader:()=>fetch('http://localhost:3000/users')
  },
  {
    path:'/update/:id',
    element:<Update></Update>,
    loader:()=>fetch('')
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
