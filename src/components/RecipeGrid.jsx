import { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"

export default function RecipeGrid() {
  useEffect(() => {
    fetch('/data/recipes.json')
  }, [])

  return (
    <div style={{marginTop: '40px'}}>
      <RecipeCard />
    </div>
  )
}