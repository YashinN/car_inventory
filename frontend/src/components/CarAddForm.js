import { useEffect, useState } from "react";

import { createYearArray, selectHandler } from "../utils/utils";

import "./CarAddForm.css";

const CarAddForm = (props) => {
  // states to store input values/entires.
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [owner, setOwner] = useState("");
  const [registration, setRegistration] = useState("");
  const [address, setAddress] = useState("");
  // state stores empty fields.
  const [emptyFields, setEmptyFields] = useState([]);
  // state handles error from db.
  const [error, setError] = useState(null);

  // clears all states to default.
  const clear = () => {
    setModel("");
    setMake("");
    setOwner("");
    setRegistration("");
    setAddress("");
    setEmptyFields([]);
    setError(null);
  };

  // makes request to create new car record.
  const createCar = async () => {
    // stores all entries for a new car record.
    const newCar = { model, make, owner, registration, address };

    // makes POST request to db.
    const response = await fetch(
      "https://carinventory-production.up.railway.app/api/cars/old",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // send new car record details.
        body: JSON.stringify(newCar),
      }
    );

    // receives all updated car record.
    const data = await response.json();

    // if res not ok sets error and empty fields.
    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }

    // if res ok updates record display and resets states.
    if (response.ok) {
      props.setCars(data);
      setError(null);
      clear();
    }
  };

  // calls create car when create button is clicked.
  const handleCreateCar = () => {
    createCar();
  };

  // sets default display for all inputs and states.
  const handleClear = () => {
    clear();
    // removes error display for all inputs.
    const clearError = document.querySelectorAll("#create-form input");
    clearError.forEach((input) => {
      input.classList.remove("error");
    });
  };

  // creates array of year values.
  const yearArray = createYearArray();

  return (
    <div className="container-fluid form-wrapper p-3 p-md-5 my-5">
      <div className="title-container row">
        <h1 className="text-success col-sm-12 col-md-6 col-lg-6">
          CREATE RECORD{" "}
        </h1>
        {error && (
          <div className="container error-container col-md-6 m-0 mx-3">
            {error}
          </div>
        )}
      </div>

      <form action="" className="row form-row" id="create-form">
        <div className="form-group col-sm-12 col-lg-6">
          <label htmlFor="model" className="form-label mt-4">
            Model
          </label>
          <select
            id="model"
            className={`form-select p-1 ${
              emptyFields.includes("model") ? "error" : ""
            }`}
            onChange={(e) => selectHandler(e, setModel)}
            value={model}
          >
            <option></option>
            {yearArray.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group col-sm-12 col-lg-6">
          <label htmlFor="make" className="form-label mt-4">
            Make
          </label>
          <input
            type="text"
            className={`form-control p-1 ${
              emptyFields.includes("make") ? "error" : ""
            }`}
            id="make"
            placeholder="Enter Car Make"
            onChange={(e) => selectHandler(e, setMake)}
            value={make}
          />
        </div>

        <div className="form-group col-sm-12 col-lg-6">
          <label htmlFor="owner" className="form-label mt-4">
            Owner
          </label>
          <input
            type="text"
            className={`form-control p-1 ${
              emptyFields.includes("owner") ? "error" : ""
            }`}
            id="owner"
            placeholder="Enter Owner Name"
            onChange={(e) => selectHandler(e, setOwner)}
            value={owner}
          />
        </div>

        <div className="form-group col-sm-12 col-lg-6">
          <label htmlFor="registration" className="form-label mt-4">
            Registration
          </label>
          <input
            type="text"
            className={`form-control p-1 ${
              emptyFields.includes("registration") ? "error" : ""
            }`}
            id="registration"
            placeholder="Enter Car Registration"
            onChange={(e) => selectHandler(e, setRegistration)}
            value={registration}
          />
        </div>

        <div className="form-group col-sm-12 col-lg-6">
          <label htmlFor="address" className="form-label mt-4">
            Address
          </label>
          <input
            type="text"
            className={`form-control p-1 ${
              emptyFields.includes("address") ? "error" : ""
            }`}
            id="address"
            placeholder="Enter Address"
            onChange={(e) => selectHandler(e, setAddress)}
            value={address}
          />
        </div>

        <div className="create-button-container col-sm-12 col-lg-6 mt-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCreateCar}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarAddForm;
