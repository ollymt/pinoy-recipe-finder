// pages/Homepage.jsx
import { useState } from "react"
import FeaturedCarousel from "../components/FeaturedCarousel"
import SearchBar from "../components/SearchBar"
import RecipeGrid from "../components/RecipeGrid"
import Navbar from "../components/Navbar"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <FeaturedCarousel />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <RecipeGrid searchQuery={searchQuery} />
      <Navbar />
    </>
  )
}