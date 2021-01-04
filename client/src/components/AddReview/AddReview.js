import { useState } from "react";

const AddReview = () => {

    const [reviewer, setReviewer] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("Rating");

    function addReview(e){
        e.preventDefault();

    }

    return(
        <form onSubmit={addReview} className="form-row">
            <div className="col">
                <input onChange={(e) => setReviewer(e.target.value)} type="text" placeholder="Your Name" value={reviewer}/>
            </div>
            <div className="col">
                <textarea onChange={(e) => setReview(e.target.value)} type="text" placeholder="Your review" value={review}/>
            </div>
            <div className="col">
                <select onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="col">
             </div>
        </form>
    )
}

export default AddReview;