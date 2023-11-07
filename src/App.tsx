import React from 'react'
import './App.css'
import { Home } from './pages/Home'
import { Upload } from './pages/Upload'
import { Details } from './pages/Details'
import { NotFound } from './pages/NotFound'
import MainLayout from './components/MainLayout'
import { Web3ReactProvider } from '@web3-react/core'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { connectors } from './connectors'

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Web3ReactProvider connectors={connectors}>
      <MainLayout>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>

      </MainLayout>
    </Web3ReactProvider>
    </ThemeProvider>
    </>
  )
}

const theme = createTheme({

  palette: {
    primary: {
      main: '#181A1F',
      light: '#FD8A07',
    },
    secondary: {
      main: '#008fc7',
    },
  },

})

export default App
