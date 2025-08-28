import { createContext, useState, useContext } from "react";
import { Toaster, toast } from 'react-hot-toast'

const feedbackSound = new Audio("/sounds/feedback.mp3")

// 1. create the context
const FavoritesContext = createContext();

// 2. create the provider
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // add to favorites
  const addFavorite = (recipe) => {
    setFavorites((prev) => [...prev, recipe]);
    feedbackSound.currentTime = 0;
    feedbackSound.play()
    toast.success("Added to Favorites!")
  };

  // remove from favorites
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));
    feedbackSound.currentTime = 0;
    feedbackSound.play()
    toast.error("Removed from Favorites!")
  };

  // check if recipe is in favorites
  const isFavorite = (id) => {
    return favorites.some((recipe) => recipe.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. custom hook for easy use
export function useFavorites() {
  return useContext(FavoritesContext);
}