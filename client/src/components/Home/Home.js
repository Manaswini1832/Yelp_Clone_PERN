import Header from "./Header";
import AddRestaurant from "./AddRestaurant";
import RestaurantList from "./RestaurantList";

const Home = () => {
    return(
        <div>
            <Header />
            <AddRestaurant />
            <RestaurantList />
        </div>
    )
}

export default Home;