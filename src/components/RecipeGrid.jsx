import { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"
import Masonry from 'react-masonry-css'
import './RecipeGrid.css' // Add this import

export default function RecipeGrid({ searchQuery }) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch("/data/recipes.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
  }, [])

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    700: 2,
    500: 1
  }

  return (
    <div style={{ marginTop: "40px", padding: "0 20px" }}>
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
    </div>
  )
}