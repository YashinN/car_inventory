import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BulkEdit from "./pages/BulkEditPage";
import OldCars from "./pages/OldCars";

function App() {
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    const response = await fetch(
      "https://car-inventory-dflxh6inm-yashinn.vercel.app/api/cars/"
    );
    const data = await response.json();
    setCars(data);
  };

  useEffect(() => {
    getCars();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home cars={cars} setCars={setCars} />} />
          <Route
            path="/batchEdit"
            element={<BulkEdit cars={cars} setCars={setCars} />}
          />
          <Route path="/oldCars" element={<OldCars allCars={setCars} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
