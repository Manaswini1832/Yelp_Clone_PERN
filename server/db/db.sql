CREATE TABLE restaurants (
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT NOT NULL check(price_range>=1 and price_range<=5)
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >=1 and rating <=5)
);

/*Inner join*/
 SELECT * FROM restaurants INNER JOIN reviews on restaurants.id = reviews.restaurant_id;