import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CategoryListing from './pages/CategoryListing'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchResults from './pages/SearchResults'
import Footer from './components/Footer'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import ScrollToTop from './components/ScrollToTop'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'


function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryListing />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />

      </BrowserRouter>

    </>
  )
}

export default App
