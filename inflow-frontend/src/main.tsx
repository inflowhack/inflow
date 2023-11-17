import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider>
    <Routes> 


        <Route path="/" element={<Home/>}/> 
 

    </Routes> 
    </ChakraProvider>

    </BrowserRouter>

  </React.StrictMode>,
)