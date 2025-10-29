import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './components/styles/index.css'
import AppLogo from './components/AppLogo/AppLogo.jsx'
import MainForm from './components/MainForm/MainForm.jsx'
import History from './components/History/History.jsx'
import Footer from './components/Footer/Footer.jsx'

import { InputValueProvider } from './components/MainForm/MainForm.jsx';

import { BlocksValueProvider } from './components/MainForm/MainForm.jsx';

import { BonusesProvider } from './components/Bonuses/Bonuses.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BonusesProvider>

        <AppLogo />

        <InputValueProvider>

            <BlocksValueProvider>

                  <MainForm />

                  <History />

            </BlocksValueProvider>

        </InputValueProvider>

      </BonusesProvider>

        <Footer />

  </StrictMode>,
)
