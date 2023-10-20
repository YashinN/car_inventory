const express = require("express");
const carsController = require("../controllers/carsController");
const router = express.Router();

// Get all cars

router.get("/", carsController.getCars);

// Create Car

router.post("/", carsController.createCar);

// Delete Car

router.delete("/:id", carsController.deleteCar);

// Update information about more than one car

router.patch("/many", carsController.updateCars);

// Update a single car

router.patch("/:id", carsController.updateCar);

// get cars older than 5 years

router.get("/old", carsController.getOldCars);

module.exports = router;
