import { useEffect, useState } from "react";
import "./FeaturedCarousel.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoriteContext";

export default function FeaturedCarousel() {
    const [featured, setFeatured] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        fetch("/data/recipes.json")
            .then((res) => res.json())
            .then((data) => setFeatured(data))
            .catch((err) => console.error("error loading featured data", err));
    }, []);

    const handleClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length)
        }, 5000) // change every 3 secs

        return () => clearInterval(interval)
    }, [featured])

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                <div
                    className="carousel-slide-cont"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: "transform 1s ease-in-out",
                    }}
                >
                    {featured.map((item) => {
                        const favorite = isFavorite(item.id); // Get favorite status for this item

                        return (
                            <div key={item.id} className="carousel-slide">
                                <img src={item.image} alt={item.name} className="carousel-img" />
                                <div className="carousel-text">
                                    <div className="carousel-text-cont">
                                        <h2>{item.name}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="button-cont">
                                        <Link
                                            to={`/recipe/${item.id}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <Button
                                                children={
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="40"
                                                            height="32"
                                                            fill="currentColor"
                                                            className="bi bi-eye-fill"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                        </svg>
                                                        <b>View Recipe</b>
                                                    </>
                                                }
                                                variant="primary"
                                                able="enabled"
                                            />
                                        </Link>
                                        <Button
                                            children={
                                                <>
                                                    {favorite ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="28"
                                                            height="24"
                                                            fill="currentColor"
                                                            className="bi bi-star-fill" // Fixed: class to className
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="28"
                                                            height="24"
                                                            fill="currentColor"
                                                            className="bi bi-star"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                                        </svg>
                                                    )}
                                                    {favorite ? "Remove from Favorites" : "Add to Favorites"}
                                                </>
                                            }
                                            variant={favorite ? "primary" : "secondary"}
                                            able="enabled"
                                            onClick={(e) => handleClick(e, item)} // Pass the item to the handler
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}