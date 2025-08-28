import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard';
import Navbar from "../components/Navbar";
import RecipeGrid from '../components/RecipeGrid';
import SearchBar from '../components/SearchBar';
import FavoritesBanner from '../components/FavoritesBanner';

export default function Favorites() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <> 
            <FavoritesBanner />
            <RecipeGrid showFavoritesOnly="true" />
        </>
    )
}