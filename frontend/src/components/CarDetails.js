import { useState } from "react";
import EditModal from "./EditModal";
import "./CarDetails.css";

const CarDetails = (props) => {
  // state to show/hide edit modal/
  const [showModal, setShowModal] = useState(false);

  // makes delete request to remove record.
  const deleteRequest = async () => {
    // makes delete request with id of item to delete in params.
    const response = await fetch(
      "https://carinventory-production.up.railway.app/api/cars/" +
        props.car._id,
      {
        method: "DELETE",
      }
    );
    // gets update car records.
    const data = await response.json();
    // sets updated car records.
    props.setCars(data);
    // checks if all cars prop exists and updates records,this ensures all records update on other pages.
    if (props.allCars) {
      props.allCars(data);
    }
  };

  // calls delete request when delete button is clicked.
  const deleteHandler = () => {
    deleteRequest();
  };

  // shows edit modal when records edit button is clicked.
  const modalHandler = () => {
    setShowModal(true);
  };

  return (
    <div className="container-fluid details-wrapper p-0 my-2">
      <table className="table table-light mb-0">
        <tbody>
          <tr className="table-primary">
            <th colSpan="2">
              <h4 className="text mb-3">Car #{props.index + 1}</h4>
            </th>
          </tr>
          <tr className="table-light">
            <th scope="row">Model</th>
            <td>{props.car.model}</td>
          </tr>
          <tr className="table-secondary">
            <th scope="row">Make</th>
            <td>{props.car.make}</td>
          </tr>
          <tr className="table-light">
            <th scope="row">Owner</th>
            <td>{props.car.owner}</td>
          </tr>
          <tr className="table-secondary">
            <th scope="row">Registration</th>
            <td>{props.car.registration}</td>
          </tr>
          <tr className="table-light rt">
            <th scope="row">Address</th>
            <td>{props.car.address}</td>
          </tr>
          <tr className="table-primary">
            <td colSpan={2}>
              <div className=" edit-button-container container-fluid p-2">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={deleteHandler}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={modalHandler}
                >
                  Edit
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <EditModal
        car={props.car}
        index={props.index}
        setCars={props.setCars}
        showModal={showModal}
        setShowModal={setShowModal}
        allCars={props.allCars}
      />
    </div>
  );
};

export default CarDetails;
