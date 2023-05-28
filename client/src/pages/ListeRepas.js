import React, { useEffect, useState } from "react";
import Repas from "../components/Repas";
import NavBar from "../components/NavBar";
import backImg from "../assets/img/repas-back.png";
// import { Link } from "react-router-dom";
import axios from "axios";
const ListeRepas = () => {
  window.scrollTo(0, 0);
  let [data, setData] = useState([]);
  // let [query, setQuery] = useState("e");

  // let [sortMethod, setSortMethod] = useState("top");

  const fetchData = () => {
    axios.get("http://localhost:5000/api/repas").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // const searchInput = (e) => {
  //   setQuery(e.target.value);
  // };

  // ------------------------------
  // search
  // ------------------------------
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };
  // ------------------------------

  return (
    <>
      <NavBar />
      <div>
        <div className="img-back-top">
          <img src={backImg} alt="" />
        </div>
        <div className="preambule-content-profile">
          <div className="content-title-profile">
            <h2>Nos repas</h2>
          </div>
          <div className="content-form">
            <form onSubmit={searchSubmit}>
              <input
                type="text"
                placeholder="Rechercher"
                // onInput={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </form>
          </div>
        </div>
        <section>
          <div className="repas-container">
            {searchInput.length > 1
              ? filteredResults.map((item, index) => {
                  return (
                    <Repas
                      key={index}
                      nom={item.nom}
                      ingredient={item.ingredient}
                      image={item.image}
                      restaurant={item.restaurant}
                      id={item.id}
                    />
                  );
                })
              : data &&
                data.map((item, index) => {
                  return (
                    <Repas
                      key={index}
                      nom={item.nom}
                      ingredient={item.ingredient}
                      image={item.image}
                      restaurant={item.restaurant}
                      id={item.id}
                    />
                  );
                })}
          </div>
        </section>
      </div>
      <div className="img-back-bottom">
        <img src={backImg} alt="" />
      </div>
    </>
  );
};

export default ListeRepas;
