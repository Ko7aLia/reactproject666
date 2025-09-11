import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './components/styles/index.css'
import AppLogo from './components/AppLogo/AppLogo.jsx'
import MainForm from './components/MainForm/MainForm.jsx'
import History from './components/History/History.jsx'
import Footer from './components/Footer/Footer.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AppLogo />
        <MainForm />
        <History />
        <Footer />
  </StrictMode>,
)
