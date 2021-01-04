import { useState, useEffect } from "react";
import StarRating from "../StarRating";

const Reviews = (props) => {
    
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setReviews(props.reviews);
        console.log(props.reviews)
    }, []);

    return(
        <div className="row row-cols-3 mb-2 mt-3">
            {reviews.map(elem => {
                return(
                    <div className="card text-white bg-primary m-3" style={{maxWidth : "30%"}}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{elem.name}</span>
                        <span><StarRating rating={elem.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{elem.review}</p>
                    </div>
                </div>  
                )  
            })}

        </div>
    )
}   

export default Reviews;