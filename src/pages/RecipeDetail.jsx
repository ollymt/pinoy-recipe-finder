import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetail.css";
import Checkbox from "../components/Checkbox";
import Navbar from "../components/Navbar";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
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
      <Navbar />
    </div>
  );
}
