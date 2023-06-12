import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createYearArray, selectHandler } from "../utils/utils";
import "./EditModal.css";

const EditModal = (props) => {
  // states to store user values.
  const [model, setModel] = useState(props.car.model);
  const [make, setMake] = useState(props.car.make);
  const [owner, setOwner] = useState(props.car.owner);
  const [registration, setRegistration] = useState(props.car.registration);
  const [address, setAddress] = useState(props.car.address);
  // state to store empty fields.
  const [emptyFields, setEmptyFields] = useState([]);
  // state to handle errors.
  const [error, setError] = useState(null);

  // closes edit modal
  const handleClose = () => {
    props.setShowModal(false);
    // sets error state to default.
    setError(null);
  };

  // resets all fields in edit model to the original values of the record.
  const resetFields = () => {
    setModel(props.car.model);
    setMake(props.car.make);
    setOwner(props.car.owner);
    setRegistration(props.car.registration);
    setAddress(props.car.address);
    setEmptyFields([]);
    // closes edit model.
    handleClose();
  };

  // makes request to update a single car record by id.
  const updateCar = async () => {
    const response = await fetch(
      "https://carinventory-production.up.railway.app/api/cars/" +
        props.car._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // sends the fields to update.
        body: JSON.stringify({ make, model, owner, registration, address }),
      }
    );

    // recevies updated records.
    const data = await response.json();

    // if res not ok sets error and emptyfields.
    if (!response.ok) {
      setEmptyFields(data.emptyFields);
      setError(data.error);
    }

    // if res ok sets recieved data and updates props to display the new info.
    if (response.ok) {
      if (!props.allCars) {
        props.setCars(data);
      }

      // checks if component has prop, this ensures records are updated on other pages.
      if (props.allCars) {
        props.allCars(data);
      }

      // sets default error state & closes modal
      setError(null);
      props.setShowModal(false);
    }
  };

  // calls updateCar when edit button on modal is clicked.
  const editHandler = () => {
    updateCar();
  };

  const yearArray = createYearArray();

  return (
    <div>
      <Modal show={props.showModal} onHide={handleClose}>
        <div className="modal-dialog my-0">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Car #{props.index + 1}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={resetFields}
                aria-label="Close"
              ></button>
            </div>
            <div className="title-container row">
              {error && (
                <div className="container error-container col-md-6 m-0 mx-3 mt-3">
                  {error}
                </div>
              )}
            </div>
            <div className="modal-body pt-0">
              <form action="" className="row edit-form-row">
                <div className="form-group col-12">
                  <label htmlFor="model" class="form-label mt-4">
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

                <div className="form-group col-12">
                  <label htmlFor="make" className="form-label mt-4">
                    Make
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      emptyFields.includes("make") ? "error" : ""
                    }`}
                    id="make"
                    placeholder="Enter Car Make"
                    onChange={(e) => selectHandler(e, setMake)}
                    value={make}
                  />
                </div>

                <div className="form-group col-12">
                  <label htmlFor="owner" className="form-label mt-4">
                    Owner
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      emptyFields.includes("owner") ? "error" : ""
                    }`}
                    id="owner"
                    placeholder="Enter Owner Name"
                    onChange={(e) => selectHandler(e, setOwner)}
                    value={owner}
                  />
                </div>

                <div className="form-group col-12">
                  <label htmlFor="registration" className="form-label mt-4">
                    Registration
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      emptyFields.includes("registration") ? "error" : ""
                    }`}
                    id="registration"
                    placeholder="Enter Car Registration"
                    onChange={(e) => selectHandler(e, setRegistration)}
                    value={registration}
                  />
                </div>

                <div className="form-group col-12">
                  <label htmlFor="address" className="form-label mt-4">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      emptyFields.includes("address") ? "error" : ""
                    }`}
                    id="address"
                    placeholder="Enter Address"
                    onChange={(e) => selectHandler(e, setAddress)}
                    value={address}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetFields}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={editHandler}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
