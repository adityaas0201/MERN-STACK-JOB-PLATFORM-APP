import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import customFetch from './utils/customFetch.js'
import {ToastContainer} from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </StrictMode>
)
