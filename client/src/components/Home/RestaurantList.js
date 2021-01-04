import { useEffect, useContext } from "react";
import RestaurantFinder from "../../apis/RestaurantFinder";
import {RestaurantsContext} from "../../context/RestaurantsContext";
import { useHistory } from "react-router-dom";

const RestaurantList = () => {

    const {restaurants, setRestaurants, addRestaurants} = useContext(RestaurantsContext);

    let history = useHistory();

    function handleUpdate(e, id) {
      e.stopPropagation();
      history.push(`/restaurants/${id}/update`);
    }

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await RestaurantFinder.get("/");
          setRestaurants(response.data.data.restaurants);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, [restaurants]);

    return(
        <div>
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price range</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>

                </tr>
              </thead>
              <tbody>
                {restaurants ? restaurants.map(restaurant => {
                  return(
                    <tr key={restaurant.id} onClick={() => history.push(`/restaurants/${restaurant.id}`)}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>**</td>
                    <td><button className="btn btn-warning" onClick={(e) => handleUpdate(e,restaurant.id)}>Update</button></td>
                    <td><button className="btn btn-danger" onClick={async (e) => {
                      e.stopPropagation();
                        try {
                          const response = await RestaurantFinder.delete("/" + restaurant.id); 
                        } catch (err) {
                          console.error(err);
                        }
                    }}>Delete</button></td>
                  </tr>
                  )
                }) : null}
              </tbody>
          </table>
        </div>
    )
}

export default RestaurantList;