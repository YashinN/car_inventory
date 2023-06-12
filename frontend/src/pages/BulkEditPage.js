import { useState } from "react";
import BachEditForm from "../components/BachEditForm";
import BulkEditDetails from "../components/BulkEditDetails";

const BulkEdit = (props) => {
  // stores the ids of items to bach edit.
  const [editIds, setEditIds] = useState([]);
  // state to clear all selected items to edit.
  const [clear, setClear] = useState(null);

  // adds id to editIds ,stores the ids of records to edit.
  const addId = (id) => {
    setEditIds([...editIds, { id }]);
  };

  // removes id from editIds.
  const removeId = (id) => {
    // returns all ids not = to the id passed to the function.
    setEditIds(editIds.filter((carId) => carId.id !== id));
  };

  return (
    <div>
      <section>
        <BachEditForm
          editIds={editIds}
          setEditIds={setEditIds}
          setCars={props.setCars}
          setClear={setClear}
        />
      </section>

      <section>
        <section className="container-fluid row view-cars p-3 p-md-5 pb-4 mx-auto">
          <h1 className="text-success mb-4">SELECT RECORDS TO EDIT</h1>
          {props.cars.length === 0 && (
            <h2 className="text-warning">No Records In Database....</h2>
          )}
          {props.cars.map((car, index) => (
            <div
              key={car._id}
              className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4"
            >
              <BulkEditDetails
                car={car}
                index={index}
                addId={addId}
                removeId={removeId}
                clear={clear}
                setClear={setClear}
              />
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default BulkEdit;
