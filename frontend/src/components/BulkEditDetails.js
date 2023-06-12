import { useEffect, useState } from "react";

const BulkEditDetails = (props) => {
  // property to set item as selected or not.
  const [selected, setSelected] = useState(false);

  // effect runs when received prop clear is changed.
  useEffect(() => {
    // sets all select buttons as current.
    setSelected(false);
  }, [props.clear]);

  // select button is clicked sets item as selected and changes display
  const selectHandler = (e) => {
    setSelected(true);
    // adds the id of the selected item to edit.
    props.addId(props.car._id);
  };

  // selected button is clicked sets item as select and changes display
  const selectedHandler = (e) => {
    setSelected(false);
    // removes id of the selected item to edit.
    props.removeId(props.car._id);
  };

  return (
    <div className="container details-wrapper p-0 my-2">
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
              <div className="container-fluid p-2 bulkButton-container">
                {!selected && (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={selectHandler}
                  >
                    Select
                  </button>
                )}

                {selected && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={selectedHandler}
                  >
                    Selected
                  </button>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BulkEditDetails;
