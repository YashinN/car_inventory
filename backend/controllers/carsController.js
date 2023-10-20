const Car = require("../models/carsModel");
const mongoose = require("mongoose");

// Checks for empty fields in the request body and stores in array.
const getEmptyFields = (body) => {
  let emptyFields = [];
  // loops through body and stores empty fields in an array.
  for (const key in body) {
    if (body[key].length === 0) {
      emptyFields.push(key);
    }
  }
  // returns all empty fields in array.
  return emptyFields;
};

// get all cars, finds all cars in database .
const getCars = async (req, res) => {
  const allCars = await Car.find({});
  //  sends all cars to client.
  res.json(allCars);
};

// create new car, adds a new car record to database.
const createCar = async (req, res) => {
  // stores all empty fields received in body.
  let emptyFields = getEmptyFields(req.body);

  // checks for empty fields and sends error along with the empty fields.
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields!", emptyFields });
  }

  // adds new car record to database.
  try {
    // creates new car in database.
    const newCar = await Car.create({ ...req.body });
    // gets all cars from db.
    const getAll = await Car.find({});
    // sends status and updated car records from db.
    res.status(200).json(getAll);
  } catch (error) {
    console.log(error);
  }
};

// delete a new car, removes car record from db.
const deleteCar = async (req, res) => {
  // stores id of record to delete.
  const { id } = req.params;
  // deletes a car from db by id.
  const delCar = await Car.findOneAndDelete({ _id: id });
  // sends updated records.
  const getAll = await Car.find({});
  res.json(getAll);
};

// update a single car, updates a single car record.
const updateCar = async (req, res) => {
  // updates with received id.
  const { id } = req.params;
  // stores empty fields.
  let emptyFields = getEmptyFields(req.body);
  // checks if fields are empty and sends error code.
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields!", emptyFields });
  }
  // updates record in db.
  try {
    // finds the record to update by id.
    const updateCar = await Car.findOneAndUpdate({ _id: id }, { ...req.body });
    // sends updated records.
    const getAll = await Car.find({});
    res.json(getAll);
  } catch (error) {
    console.log(error);
  }
};

// updates multiple car record.
const updateCars = async (req, res) => {
  // gets the id and fields to update.
  const { ids, fields } = req.body;
  // stores empty fields.
  let emptyFields = getEmptyFields(req.body.fields);
  // checks if received empty fields.sends error.
  if (emptyFields.length > 0) {
    return res.status(400).json(emptyFields);
  }

  // updates multiple records.
  try {
    // updates record by id.
    const updateCars = await Car.updateMany(
      // sets multiple ids to update.
      { _id: { $in: ids } },
      { $set: { ...fields } }
    );
    // sends updated car records.
    const getAll = await Car.find({});
    res.json(getAll);
  } catch (error) {
    console.log(error);
  }
};

// gets all cars older than 5 years.
const getOldCars = async (req, res) => {
  // gets all records older than 5 years from db.
  const oldCars = await Car.find({ model: { $lte: 2017 } });
  res.json(oldCars);
};

module.exports = {
  getCars,
  createCar,
  deleteCar,
  updateCar,
  updateCars,
  getOldCars,
};
