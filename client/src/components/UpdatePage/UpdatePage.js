import { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";
import {RestaurantsContext} from "../../context/RestaurantsContext";

const UpdatePage = () => {
    const test = useParams();
    const restaurantId = test.id;

    const {restaurants, setRestaurants, addRestaurants} = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price range");
    let history = useHistory();

    useEffect(async () => {
        try {
            const response = await RestaurantFinder.get(`/${restaurantId}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        } catch (err) {
            console.error(err);
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.put(`/${restaurantId}`, {
                name, location, price_range: priceRange
            });
            addRestaurants({name, location, price_range: priceRange});
            history.push("/");
            
        } catch (err) {
            console.error(err.message);
        }
    }


    return(
        <div>
            <h1 className="text-center">Update restaurant</h1>
            <form className="form-row" onSubmit={handleSubmit}>
                    <div className="col">
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" value={name}/>
                    </div>
                    <div className="col">
                        <input onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" value={location}/>
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
                    <div className="col">
                        <button className="btn btn-primary">Update</button>
                    </div>
            </form>
        </div>
    )
}

export default UpdatePage;