import React, { useState, useContext } from "react";

export const RestaurantsContext = React.createContext();

export const RestaurantsContextProvider = props => {

    const [ restaurants, setRestaurants ] = useState([]);

    const addRestaurants = (restaurant) => {
        return ([...restaurants, restaurant]);
    }

    return(
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}