import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const PublicRepas = ({ nom, ingredient, image, restaurant, id }) => {
  const [repas, setRepas] = useState([]);
  // const removeData = (id) => {
  //   axios.delete(`http://localhost:5000/api/repas/${id}`).then((res) => {
  //     alert("Repas supprimé avec succès");
  //     setRepas(res.data);
  //     window.location.reload();
  //   });
  // };
  return (
    <div className="recipe" style={{ width: "170px", height: "300px" }}>
      <h3>{nom}</h3>
      <div className="img-container">
        <img src={`${image}`} alt="Logo-Recipe" />
      </div>

      <div className="info-container">
        <div className="info-title">
          <span>{`${restaurant}`}</span>
        </div>
        <div className="info-description">
          <span>Ingrédient : {`${ingredient}`}</span>
        </div>
      </div>
    </div>
  );
};

export default PublicRepas;
