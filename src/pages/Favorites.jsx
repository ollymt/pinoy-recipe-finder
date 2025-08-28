import { useState } from 'react'
import RecipeGrid from '../components/RecipeGrid';
import FavoritesBanner from '../components/FavoritesBanner';

export default function Favorites() {
    return (
        <> 
            <FavoritesBanner />
            <RecipeGrid showFavoritesOnly="true" />
        </>
    )
}