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
      // console.log(response.data);
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

  // ------------------------------
  //          Search Input
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
      // console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };
  // ------------------------------
  //  Plan : Recherche par secteur
  // ------------------------------
  // si on sélectionne un secteur
  /***
   * 1) pouvoir récupérer la valeur de ce secteur
   *
   */
  const [filterTags, setFilterTags] = useState([]);
  const filterHandler = (event) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      );
    }
    // pour tous les éléments de l'object filterTags
  };
  // console.log(filterTags);

  /** 2) on cherche les restaurants dans ce secteur, ce qui
   * revient à " Chercher un user dont user.secteur = secteur.recherchée"
   */
  const [getUser, setgetUser] = useState([]);
  const fetchGetUser = () => {
    axios.get(`http://localhost:5000/api/user/`).then((response) => {
      // console.log(response.data);
      setgetUser(response.data);
    });
  };
  useEffect(() => {
    fetchGetUser();
  }, []);
  let result = []; // la liste des restaurants checkés ou filtrés
  const fetchRestaurant = () => {
    let checkTotal = filterTags.length;
    let userTotal = getUser.length;
    if (checkTotal > 0) {
      for (let i = 0; i <= checkTotal; i++) {
        for (let j = 0; j <= userTotal; j++) {
          if (getUser[j]?.secteur) {
            //teste si le key secteur existe dans l'objet
            if (filterTags[i] === getUser[j].secteur) {
              // console.log(getUser[j].secteur, filterTags[i]);
              result.push(getUser[j].restaurant);
            }
          }
        }
      }
    }
    return result;
  };
  useEffect(() => {
    fetchRestaurant();
  }, []);
  console.log(fetchRestaurant());

  /* 3) si restaurant checké => trouvé, afficher tous les repas de ces restaurants
   *
   * ***/

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
                <label className="main">
                  Nord
                  <input
                    type="checkbox"
                    onChange={filterHandler}
                    value="Nord"
                  />
                  <span className="geekmark"></span>
                </label>

                <label className="main">
                  Ouest
                  <input
                    type="checkbox"
                    onChange={filterHandler}
                    value="Ouest"
                  />
                  <span className="geekmark"></span>
                </label>

                <label className="main">
                  Sud
                  <input type="checkbox" onChange={filterHandler} value="Sud" />
                  <span className="geekmark"></span>
                </label>
                <label className="main">
                  Est
                  <input type="checkbox" onChange={filterHandler} value="Est" />
                  <span className="geekmark"></span>
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
            ) : searchInput.length > 1 && result.length <= 0 ? (
              filteredResults.map((item, index) => {
                return (
                  <PublicRepas
                    key={index}
                    nom={item.nom}
                    ingredient={item.ingredient}
                    restaurant={item.restaurant}
                    image={item.image}
                    id={item.id}
                  />
                );
              })
            ) : result.length > 0 && searchInput.length <= 1 ? (
              data &&
              data.map((item, index) => {
                for (let i = 0; i <= data.length; i++) {
                  for (let j = 0; j <= result.length; j++) {
                    if (item.restaurant == result[j]) {
                      return (
                        <PublicRepas
                          key={index}
                          nom={item.nom}
                          ingredient={item.ingredient}
                          restaurant={item.restaurant}
                          image={item.image}
                          id={item.id}
                        />
                      );
                    }
                  }
                }
              })
            ) : searchInput.length > 1 && result.length > 0 ? (
              filteredResults.map((item, index) => {
                for (let i = 0; i <= data.length; i++) {
                  for (let j = 0; j <= result.length; j++) {
                    if (item.restaurant == result[j]) {
                      return (
                        <PublicRepas
                          key={index}
                          nom={item.nom}
                          ingredient={item.ingredient}
                          restaurant={item.restaurant}
                          image={item.image}
                          id={item.id}
                        />
                      );
                    }
                  }
                }
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
