import { useState, useEffect } from "react";
import CarDetails from "../components/CarDetails";

const OldCars = (props) => {
  // state to store cars older than 5years.
  const [cars, setCars] = useState([]);
  const [loaded, setLoading] = useState("null");

  // get request to fetch records from db.
  const getOldCars = async () => {
    const response = await fetch(
      "https://carinventory-production.up.railway.app/api/cars/old"
    );
    const data = await response.json();

    // sets state to display old car records.
    setCars(data);
  };

  // use effect runs when any changes have been made to car records.
  useEffect(() => {
    // calls get cars to get old car records.
    getOldCars();
  }, [cars]);

  return (
    <div>
      <section className="container-fluid row view-cars p-3 p-md-5 pb-4 mx-auto mt-4">
        <h1 className="text-success mb-4">VIEW OLD CARS</h1>
        {cars.length === 0 && (
          <h2 className="text-warning">No Records In Database....</h2>
        )}
        {cars.map((car, index) => (
          <div
            key={car._id}
            className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4"
          >
            <CarDetails
              car={car}
              setCars={setCars}
              index={index}
              allCars={props.allCars}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default OldCars;
