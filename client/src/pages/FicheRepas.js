import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import backImg from "../assets/img/repas-back.png";
import { Link } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";
const FicheRepas = () => {
  window.scrollTo(0, 0);

  const [getRepas, setgetRepas] = useState([]);

  let paramID = useParams();

  let nomRepas, ing, rest, img;

  const fetchGetRepas = async () => {
    await axios
      .get(process.env.REACT_APP_HOST + "/" + paramID.id)
      .then((response) => {
        setgetRepas(response.data);
        // console.log(response.data);
      });
  };

  useEffect(() => {
    fetchGetRepas();
  }, []);
  if (typeof paramID.id === "undefined") {
    nomRepas = "";
    ing = "";
    rest = "";
    img = "";
  } else {
    nomRepas = getRepas.nom;
    ing = getRepas.ingredient;
    rest = getRepas.restaurant;
    img = getRepas.image;
  }
  // ----------------------
  // update step
  // ----------------------

  let oldImage = getRepas.image;
  console.log(typeof getRepas.image);
  const [nom, setName] = useState();
  const [ingredient, setIngredient] = useState();
  const [restaurant, setRestaurant] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    setImage(getRepas.image);
  }, [getRepas.image]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ nom, ingredient, restaurant });

    await axios
      .put(`http://localhost:5000/api/repas/${paramID.id}`, {
        nom,
        ingredient,
        image,
        restaurant,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert("Repas modifié avec succès");
        }

        window.location.reload();
        // Handle response
      });
  };

  return (
    <>
      <NavBar />
      <div>
        <div>
          <section>
            <div className="img-back-top">
              <img src={backImg} alt="" />
            </div>
            <div className="preambule-content-profile">
              <div>
                <form method="post" onSubmit={handleSubmit}>
                  <div className="recipe-table">
                    <div className="preambule-content">
                      <div className="content-title">
                        <h2>Fiches Repas</h2>
                      </div>
                    </div>
                    <div className="table-img">
                      <div className="image-bloc">
                        <img src={image} alt="Logo-recipe" />
                        <FileBase64
                          type="file"
                          name="image"
                          multiple={false}
                          onDone={({ base64 }) => {
                            setImage(base64);
                          }}
                        />
                      </div>
                      <table>
                        <tr>
                          <td>Nom</td>
                          <td>
                            <input
                              type="text"
                              name="nom"
                              id="nom"
                              defaultValue={nomRepas}
                              onChange={(e) => setName(e.target.value)}
                              className="name-value"
                            />
                            {/* <h3>{getRepas.nom}</h3> */}
                          </td>
                        </tr>
                        <tr>
                          <td>Ingrédients</td>
                          <td>
                            <input
                              type="text"
                              name="ingredient"
                              id="ingredient"
                              defaultValue={ing}
                              onChange={(e) => setIngredient(e.target.value)}
                              className="name-value"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Restaurant</td>
                          <td>
                            <input
                              type="text"
                              name="restaurant"
                              value={rest}
                              className="name-value"
                              onChange={(e) => setRestaurant(e.target.value)}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* <div className="button-valid">
                      <div>
                        <span>Enregistrer</span>
                        {/* </Link> 
                      </div>
                    </div> */}
                    <div>
                      <input
                        type="submit"
                        value="Enregistrer"
                        className="button-delete"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        <div className="img-back-bottom">
          <img src={backImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default FicheRepas;
