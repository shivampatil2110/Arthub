// backend/routes/order.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// POST /api/v1/orders/:artworkId/purchase - Purchase an artwork (artworkId provided in the URL)
router.post("/:artworkId/purchase", orderController.createOrder);

// GET /api/v1/orders - Retrieve orders by buyer email (expects a query parameter 'email')
router.get("/", orderController.getOrdersByBuyer);

module.exports = router;
