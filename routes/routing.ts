import express, { response } from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("home");
})

routes.get("/specialty", (req, res) => {
    let pizzaName: string = req.query.pizzaName as string;
    let price: number = +(req.query.price as string);

    let pic;
    if (pizzaName == "Meat Lovers") {
        pic = "/pix/meat.jpg";
    } else if (pizzaName == "Pineapple") {
        pic = "pix/pina.jpg";
    } else {
        pic = "pix/bbq.jpg";
    }

    res.render("specialty", {pizzaName, price, pic});
})

routes.get("/review", (req, res) => {
    res.render("review");
})

routes.post("/review-thx", (req, res) => {
    let name: string = req.body.name;
    let comment: string = req.body.comment;
    let rating = req.body.rating;

    res.render("review-thx", {name, comment, rating});
})

routes.get("/custom", (req, res) => {
    res.render("custom");
})   

// confirmation page
routes.post("/confirmation", (req, res) => {

    let size = req.body.size;
    
    let toppings;
    if (req.body.toppings) {
        if (typeof req.body.toppings == "string") {
            toppings = [req.body.toppings]
        } else {
            toppings = req.body.toppings;
        }
    } else {
        toppings = [];
    }

    let glutenFree: boolean = Boolean(req.body.glutenFree);
    let specialInstructions: string = req.body.specialInstructions || "";
    let price = size == "Small" ? 7 + toppings.length * .5 : size == "Medium" ? 10 + toppings.length : 12 + toppings.length * 1.25;

    let freeDelivery = price >= 15;

    if (glutenFree) {
        price += 2;
    }

    // fix decimal places
    price = "$" + price.toFixed(2);

    res.render("confirmation", {size, toppings, glutenFree, specialInstructions, price, freeDelivery});
})

export default routes;