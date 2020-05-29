const express = require("express");
const cart = express.Router();
const cartURI = "/cart";

let cartItems = [
    {
        id: 1,
        product: "RAM",
        price: "160.00",
        quantity: 2
    },
    {
        id: 2,
        product: "SSD",
        price: "135.00",
        quantity: 2
    },
    {
        id: 3,
        product: "GPU",
        price: "550.00",
        quantity: 1
    },
    {
        id: 4,
        product: "Motherboard",
        price: "299.00",
        quantity: 1
    }
];

let cartId = cartItems.length + 1;

cart.get(cartURI, (request, response) => {
    response.status(200)
    response.json(cartItems)
})

cart.get(`${cartURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let item = cartItems.find((cartItem) => {
        return cartItem.id === id;
    })
    if (item) {
        response.json(item)
    } else {
        response.status(404)
        response.send("ID not found")
    }
});

cart.post(cartURI, (request, response) => {
    let newCartItem = request.body;
    newCartItem.id = cartId;
    cartItems.push(newCartItem);
    cartId++;
    response.status(201);
    response.json(newCartItem);
});

cart.put(`${cartURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let updatedCartItem = request.body;
    updatedCartItem.id = id;
    let cartIndex = cartItems.findIndex((cartItem) => {
        return cartItem.id === id;
    })
    if (cartIndex === -1) {
        response.status(204)
        response.send(`Nothing at this ID ${id}`)
    } else {
        cartItems.splice(cartIndex, 1, updatedCartItem);
        response.status(200)
        response.json(updatedCartItem)
    }
});

cart.delete(`${cartURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let cartIndex = cartItems.findIndex((cartItem) => {
        return cartItem.id === id;
    });
    if (cartIndex > -1) {
        cartItems.splice(cartIndex, 1);
        response.status(200);
        response.json(cartItems);
    } else {
        response.status(204);
        response.send(`Nothing at this ID ${id}`);
    }
});

module.exports = { cart };