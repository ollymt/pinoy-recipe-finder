import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const feedbackSound = new Audio("/sounds/feedback.mp3");

// 1. create the context
const FavoritesContext = createContext();

// 2. create the provider
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // load from localStorage on first render
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // save to localStorage anytime favorites changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // add to favorites
  const addFavorite = (recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === recipe.id)) return prev; // no dupes
      return [...prev, recipe];
    });
    feedbackSound.currentTime = 0;
    feedbackSound.play();
    toast.success(`Added ${recipe.name} to Favorites!`);
  };

  // remove from favorites
  const removeFavorite = (id) => {
    const recipeToRemove = favorites.find((recipe) => recipe.id === id);
    if (!recipeToRemove) return;

    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));

    feedbackSound.currentTime = 0;
    feedbackSound.play();
    toast.error(`Removed ${recipeToRemove.name} from Favorites!`);
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