import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage';
import Auth from './pages/Auth/Auth';
import CatergoryArticle from './pages/CategoryArticle/CatergoryArticle';
import AddArticle from './pages/AddArticle/AddArticle';

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/addarticle' element={<AddArticle/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/category/:categoryName' element={<CatergoryArticle/>} />
    </Routes>
    </BrowserRouter>
      
   
  )
}

export default App
