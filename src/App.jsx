import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CategoryListing from './pages/CategoryListing'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchResults from './pages/SearchResults'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryListing />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
