// pages/Homepage.jsx
import { useState } from "react"
import FeaturedCarousel from "../components/FeaturedCarousel"
import SearchBar from "../components/SearchBar"
import RecipeGrid from "../components/RecipeGrid"

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <>
            <FeaturedCarousel />
            <div style={{
                marginTop: "2rem"
            }}>
                <h1>Recipify</h1>
            </div>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <RecipeGrid searchQuery={searchQuery} />
        </>
    )
}