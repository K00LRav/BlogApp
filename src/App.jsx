import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage';
import CatergoryArticle from './pages/CategoryArticle/CatergoryArticle';

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/category/:categoryName' element={<CatergoryArticle/>} />
    </Routes>
    </BrowserRouter>
      
   
  )
}

export default App
