import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";
import StarRating from "../StarRating";

import Reviews from "../Reviews/Reviews";
import AddReview from "../AddReview/AddReview";

const RestaurantDetail = () => {

    const restaurantId = useParams().id;
    const [name, setName] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(async() => {
        try {
            const response = await RestaurantFinder.get(`${restaurantId}`);
            setName(response.data.data.restaurant.name);
            setReviews(response.data.data.reviews);
        } catch (err) {
            console.error(err);
        }
    }, []);

    return(
        <div className="container mt-5">
            <h1 className="font-weight-light display-1 text-center">{name}</h1>
            <StarRating rating={3.6}/>
            <Reviews reviews={reviews}/>
            <AddReview />
        </div>
    )
}

export default RestaurantDetail;