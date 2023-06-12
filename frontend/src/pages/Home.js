import CarDetails from "../components/CarDetails";
import CarAddForm from "../components/CarAddForm";

const Home = (props) => {
  return (
    <div>
      <section>
        <CarAddForm setCars={props.setCars} />
      </section>

      <section className="container-fluid row view-cars p-3 p-md-5 pb-4 mx-auto">
        <h1 className="text-success mb-4">VIEW RECORDS</h1>
        {props.cars.length === 0 && (
          <h2 className="text-warning">No Records In Database....</h2>
        )}
        {props.cars.map((car, index) => (
          <div
            key={car._id}
            className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4"
          >
            <CarDetails car={car} setCars={props.setCars} index={index} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
