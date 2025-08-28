import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetail.css";
import Checkbox from "../components/Checkbox";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useFavorites } from "../contexts/FavoriteContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  const handleClick = () => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id)
    } else {
      addFavorite(recipe)
    }
  }

  useEffect(() => {
    fetch("/data/recipes.json")
      .then((res) => res.json())
      .then((data) => setRecipe(data[id - 1]))
      .catch((err) => console.error("error loading recipe", err));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <div className="image-container">
        <img src={recipe.image} alt={recipe.name} />
        <div className="overlay">
          <div className="basic-detail-cont">
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
            <Button children={
              <>
                {isFavorite(recipe.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                    </svg>
                )}
                { isFavorite(recipe.id) ? "Remove from Favorites" : "Add to Favorites" }
              </>
            } variant={isFavorite(recipe.id) ? "primary" : "secondary"} able="enabled" onClick={handleClick}/>
          </div>
        </div>
      </div>

      <div className="detail-cont">
        <div className="ingredients-cont">
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients?.map((item, idx) => (
              <li key={idx}>
                <Checkbox /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="instructions-cont">
          <h3>Instructions:</h3>
          <ul>
            {recipe.instructions?.map((item, idx) => (
              <li key={idx}>
                <Checkbox /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
