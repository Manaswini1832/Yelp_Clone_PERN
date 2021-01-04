import { useState, useContext } from "react";
import RestaurantFinder from "../../apis/RestaurantFinder";
import {RestaurantsContext} from "../../context/RestaurantsContext";

const AddRestaurant = () => {

    const {restaurants, setRestaurants, addRestaurants} = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price range");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name, location, price_range: priceRange
            });
            addRestaurants({name, location, price_range: priceRange});
            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Name" value={name}/>
                    </div>
                    <div className="col">
                        <input onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location" value={location}/>
                    </div>
                    <div className="col">
                        <select onChange={(e) => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2" value={priceRange}>
                            <option disabled>Price range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className="col btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant;