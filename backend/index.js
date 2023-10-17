require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const carsRoutes = require("./routes/carsRoutes");

// Create Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cars", carsRoutes);

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
