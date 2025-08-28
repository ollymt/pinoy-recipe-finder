import { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"
import Masonry from 'react-masonry-css'
import './RecipeGrid.css'
import { useFavorites } from "../contexts/FavoriteContext"

export default function RecipeGrid({ searchQuery, showFavoritesOnly = false }) {
  const [recipes, setRecipes] = useState([])
  const { favorites, isFavorite } = useFavorites()

  useEffect(() => {
    fetch("/data/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("loaded recipes:", data)
        setRecipes(data)
      })
  }, [])


  // First filter by favorites if needed, then by search query
  const filteredRecipes = recipes.filter((recipe) => {
    if (!recipe || !recipe.name) return false // skip broken recipes

    if (showFavoritesOnly && !isFavorite(recipe.id)) {
      return false
    }

    if (!searchQuery) return true // no search, show all

    return recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  })


  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    700: 2,
    500: 1
  }

  return (
    <div style={{ marginTop: "40px", marginBottom: "1rem", padding: "0 20px" }}>
      {showFavoritesOnly && filteredRecipes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 className="no-recipe-img">🦗</h1>
          <h3>No favorite recipes yet!</h3>
          <p className="empty-message">Click
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" fill="#d94f04" className="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg> 
          to add recipes to Favorites.</p>
        </div>
      )}

      {!showFavoritesOnly && filteredRecipes.length === 0 && searchQuery && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 className="no-recipe-img">🫥</h1>
          <h3>baby im not even here, im a hallucination</h3>
          <p>"{searchQuery}" did not yield any results.</p>
        </div>
      )}

      {filteredRecipes.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card animated-card">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </Masonry>
      )}
    </div>
  )
}