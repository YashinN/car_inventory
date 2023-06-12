import { useState } from "react";
// import common functions
import { createYearArray, selectHandler } from "../utils/utils";
import "./BachEditForm.css";

const BachEditForm = (props) => {
  // sets active property
  const [currentProperty, setCurrentProperty] = useState("model");
  // stores user input
  const [editedValue, setEditValue] = useState("");
  // stores empty fields.
  const [emptyFields, setEmptyFields] = useState([]);

  // calls function to get list of years to use in selection.
  const yearArray = createYearArray();

  // request to update multiple records.
  const updateRequest = async () => {
    // gets all the record ids to edit in an array.
    const idArray = props.editIds.map((id) => id.id);

    // makes Patch req to updated data.
    const response = await fetch("/api/cars/many", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // body sends ids, property and value to edit.
      body: JSON.stringify({
        ids: idArray,
        fields: { [currentProperty]: editedValue },
      }),
    });

    const data = await response.json();
    // checks if empty fields were send to db.
    if (!response.ok) {
      // sets emptyFields to all empty fields.
      setEmptyFields(data);
    }

    // updates cars with new db data.
    if (response.ok) {
      props.setCars(data);
    }
  };

  // handles property switch
  const handlePropertySwitch = (e) => {
    // gets input field
    const form = document.querySelector(".live-input");
    // removes error class
    form.classList.remove("error");
    // sets default value to empty.
    setEditValue("");
    // sets active property to edit.
    setCurrentProperty(e.target.value.toLowerCase());
  };

  // clears all selected items to edit when clear button is clicked.
  const clearSelectedHandler = async () => {
    // sets clear to true to reset selected items.
    await props.setClear(true);
    // then clears ids that were stored for edit.
    props.setEditIds([]);
    // sets clear to defualt.
    props.setClear(null);
  };

  return (
    <div className="container-fluid p-3  p-md-5 my-5">
      <h1 className="text-success">BACH EDIT</h1>
      <form action="" className="row form-row" id="bulkEdit-from">
        <div className="form-group col-sm-12 col-lg-2">
          <label htmlFor="select" className="form-label mt-4">
            Select a Property
          </label>
          <select
            id="select"
            className="form-select p-1"
            onChange={handlePropertySwitch}
          >
            <option>Model</option>
            <option>Make</option>
            <option>Owner</option>
            <option>Registration</option>
            <option>Address</option>
          </select>
        </div>

        {currentProperty === "model" && (
          <div className="form-group col-sm-12 col-lg-6">
            <label htmlFor="editModel" className="form-label mt-4">
              Select model
            </label>
            <select
              id="editModel"
              className={`form-select p-1 live-input ${
                emptyFields.includes("model") ? "error" : ""
              }`}
              onChange={(e) => selectHandler(e, setEditValue)}
              value={editedValue}
            >
              <option></option>
              {yearArray.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>
          </div>
        )}

        {currentProperty !== "model" && (
          <div className="form-group colsm-12 col-lg-6">
            <label htmlFor="propertyEdit" className="form-label mt-4">
              Edit {currentProperty}
            </label>
            <input
              type="text"
              className={`form-select p-1 live-input ${
                emptyFields.includes(currentProperty) ? "error" : ""
              }`}
              id="propertyEdit"
              placeholder={`Enter ${currentProperty}`}
              onChange={(e) => selectHandler(e, setEditValue)}
              value={editedValue}
            />
          </div>
        )}

        <div className="bulkButton-container col-sm-12 col-lg-4 mt-5">
          <button
            type="button"
            className="btn btn-warning"
            onClick={clearSelectedHandler}
          >
            Clear Selected
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={updateRequest}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BachEditForm;
