import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLogo from './AppLogo.jsx'
import MainForm from './MainForm.jsx'
import History from './History.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AppLogo />
        <MainForm />
        <History />
        <Footer />
  </StrictMode>,
)
