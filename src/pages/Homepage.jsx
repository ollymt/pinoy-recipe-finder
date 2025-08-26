import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FeaturedCarousel from '../components/FeaturedCarousel'
import SearchBar from '../components/SearchBar'
import RecipeGrid from '../components/RecipeGrid'
import Navbar from '../components/Navbar'

export default function HomePage() {
    return (
        <>
            <FeaturedCarousel />
            <SearchBar />
            <RecipeGrid />
            <Navbar />
        </>
    )
}