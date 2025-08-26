import "./RecipeCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Masonry from 'react-masonry-css';
import Button from "./Button";
import { Link } from 'react-router-dom'

export default function RecipeCard() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('/data/recipes.json')
        .then(res => res.json())
        .then(data => setRecipes(data))
        .catch(err => console.error('error loading recipes', err));
    }, []);


  return (
    <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
    >
        {recipes.map((recipe, index) => (
            <Link to={`/recipe/${index}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" key={index}>
                    <img src={recipe.image} className="card-img" alt={recipe.title} />
                    <div className="card-body overlay">
                        <div className="card-info">
                            <h5 className="card-title">{recipe.name}</h5>
                            <p className="card-text">{recipe.description}</p>
                        </div>
                        <div className="buttons">
                            <Button children={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                </svg>
                            } variant="secondary" able="enabled"/>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
  </Masonry>
  );
}
