// App.jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Homepage'
import RecipeDetail from './pages/RecipeDetail'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import Favorites from './pages/Favorites'
import { Toaster, toast } from 'react-hot-toast'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/recipe/:id' element={<RecipeDetail />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <Navbar />
      </>
      <Footer />
      <Toaster position="top-right" reverseOrder={false}/>
    </>
  )
}

export default App;
