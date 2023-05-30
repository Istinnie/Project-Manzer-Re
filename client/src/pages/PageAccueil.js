import React, { useEffect, useState } from "react";
import Repas from "../components/Repas";
import PublicRepas from "../components/PublicRepas";
import NavBar from "../components/NavBar";
import backImg from "../assets/img/repas-back.png";
import { Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
const PageAccueil = () => {
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(true);

  let [data, setData] = useState([]);
  let [query, setQuery] = useState("e");
  // let [sortMethod, setSortMethod] = useState("top");

  const fetchData = () => {
    axios.get(process.env.REACT_APP_HOST).then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoading(false);
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

  // const topFlopClick = () => {
  //   if (sortMethod === "top") {
  //     setSortMethod("flop");
  //   } else {
  //     setSortMethod("top");
  //   }
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
        <div className="preambule-content">
          <div className="content-title">
            <h2>Menu du jour</h2>
            <span>
              Manzer.re est une entreprise fictive qui permet aux commerçants de
              mettre en ligne leur repas du jour.
            </span>
          </div>
          <div className="content-section">
            <form onSubmit={searchSubmit} className="content-form">
              <input
                type="text"
                placeholder="Rechercher"
                onChange={(e) => searchItems(e.target.value)}
              />
              {/* <input type="submit" value="Rechercher" />
              <button
                onClick={topFlopClick}
                title="Trier les films par ordre de popularité"
              >
                {sortMethod.toUpperCase()}
              </button> */}
              <div className="form-secteur">
                <label class="main">
                  Nord
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>

                <label class="main">
                  Ouest
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>

                <label class="main">
                  Sud
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>
                <label class="main">
                  Est
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>
              </div>
            </form>
          </div>
        </div>
        <section>
          <div className="repas-container">
            {loading ? (
              <div className="spin-center">
                <ClipLoader speedMultiplier={0.5} />
                <span>Chargement ...</span>
              </div>
            ) : searchInput.length > 1 ? (
              filteredResults.map((item, index) => {
                return (
                  <PublicRepas
                    key={index}
                    nom={item.nom}
                    ingredient={item.ingredient}
                    image={item.image}
                    id={item.id}
                  />
                );
              })
            ) : (
              data &&
              data.map((item, index) => {
                return (
                  <PublicRepas
                    key={index}
                    nom={item.nom}
                    ingredient={item.ingredient}
                    image={item.image}
                    restaurant={item.restaurant}
                    id={item.id}
                  />
                );
              })
            )}
          </div>
        </section>
      </div>
      <div className="img-back-bottom">
        <img src={backImg} alt="" />
      </div>
    </>
  );
};

export default PageAccueil;
