import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Browse.css";

import jewelImg from '../images/jewelry.png';
import dogImg from '../images/shiba.png';
import cashImg from '../images/cash-flow.png';
import electronicsImg from '../images/device.png';
import carImg from  '../images/car.png';
import lostImg from '../images/lost-items.png';

const categories = [
  { name: "Animal", img: dogImg },
  { name: "Jewellery", img: jewelImg },
  { name: "Cash", img: cashImg },
  { name: "Vehicle", img: carImg },
  { name: "Electronics", img: electronicsImg },
  { name: "Other", img: lostImg },
];

const Browse = () => {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <div className="category-header">
        <h2>Browse Items by Category</h2>
      </div>

      <div className="category-cards">
        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            <img src={cat.img} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Browse;