require("dotenv").config();//Should be on top of everything else

const { json } = require("express");
const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./db/index");

//Middleware
app.use(express.json()); //Comes built in with express. It takes stuff from inside body of req and sends it to our route handler

//Get all restaurants
app.get("/api/v1/restaurants", async(req, res) => {
    //Make request to postgres
    try {
        const response = await db.query("SELECT * FROM restaurants");
        const data = response.rows[0];
        res.status(200).json({
            status: "Success",
            data: {
                restaurants: data
            }
        });
    } catch (err) {
        console.error(err.message);
    }
});

//Get individual restaurant
app.get("/api/v1/restaurants/:restaurantId", async(req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const response = await db.query("SELECT name,location,price_range FROM restaurants WHERE id = $1", [restaurantId]);
        console.log(response.rows[0]);
    
        res.status(200).json({
            status: "Success",
            data : {
                restaurant: response.rows[0]
            }
        }); 
    } catch (err) {
        console.error(err.message)
    }
});

//Create a restaurant
app.post("/api/v1/restaurants", async(req, res) => {
    try {
        const { name, location, price_range } = req.body;
        await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3)", 
        [name, location, price_range]
        )
        .then(() => {
            res.json({
                status: "Success",
                message: "Restaurant added"
            })
        })
        .catch((err) => {
            res.json({
                status: "Fail", 
                message: "Couldn't add restaurant. Please try again!"
            })
        })
    } catch (err) {
        console.error(err.message);
    }
});

//Update a restaurant
app.put("/api/v1/restaurants/:restaurantId", async(req, res) => {
    try {
        const { restaurantId } = req.params;
        const { name, location, price_range } = req.body;
        await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4",
            [name, location, price_range, restaurantId]
        ).then(() => {
            res.json({
                status: "Success",
                message: "Restaurant updated"
            })
        })
        .catch((err)=>{
            res.json({
                status: "Fail",
                message: "Couldn't update the restaurant. Please try again!"
            });
        });
    } catch (err) {
        console.error(err.message);
    }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:restaurantId", async(req, res) => {
    const { restaurantId } = req.params;
    await db.query(
        "DELETE FROM restaurants WHERE id = $1",
        [restaurantId]
    )
    .then(() => {
        res.json({
            status: "Success",
            message:"Restaurant deleted"
        });
    })
    .catch((err) => {
        res.json({
            status: "Fail", 
            message: "Failed to delete the restaurant. Please try again!"
        });
    });
});

app.listen(PORT, (req, res) => {
    console.log(`server is up and listening on ${PORT}`);
});