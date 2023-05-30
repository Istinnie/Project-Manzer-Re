import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import backImg from "../assets/img/repas-back.png";
// import { Link } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";
const AjoutRepas = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const [getUser, setgetUser] = useState([]);

  const fetchGetUser = async () => {
    await axios
      .get(`http://localhost:5000/api/user/${loginData.email}`)
      .then((response) => {
        setgetUser(response.data[0]);
      });
  };

  useEffect(() => {
    fetchGetUser();
  }, []);

  // ""

  const [nom, setName] = useState();
  const [ingredient, setIngredient] = useState();

  let restaurant = getUser.restaurant;
  const [image, setImage] = useState();
  const handleSubmit = async (e) => {
    // Prevent the default submit and page reload
    e.preventDefault();

    console.log({
      nom,
      ingredient,
      image,
      restaurant,
    });
    // Handle validations
    await axios
      .post(process.env.REACT_APP_HOST, {
        nom,
        ingredient,
        image,
        restaurant,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          alert("Repas ajouté avec succès");
          // nom = "";
          // ingredient = "";
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
                        <h2>Fiche Repas</h2>
                      </div>
                    </div>
                    <div className="table-img">
                      <div className="image-bloc">
                        <img src={image} alt="" />

                        <FileBase64
                          type="file"
                          name="image"
                          multiple={false}
                          onDone={({ base64 }) => setImage(base64)}
                        />
                      </div>
                      <div>
                        <table>
                          <tr>
                            <td>Nom</td>
                            <td>
                              <input
                                type="text"
                                className="name-value"
                                name="nom"
                                id="nom"
                                value={nom}
                                onChange={(e) => setName(e.target.value)}
                              />
                              {/* <h3>{getRepas.nom}</h3> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Ingrédients </td>
                            <td>
                              <input
                                type="text"
                                className="name-value"
                                name="ingredient"
                                id="ingredient"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Restaurant</td>
                            <td>
                              <input
                                type="text"
                                className="name-value"
                                name="restaurant"
                                value={getUser.restaurant}
                                // onChange={(e) => setRestaurant(e.target.value)}
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div>
                        <div>
                          <input type="submit" value="Enregistrer" />
                        </div>
                      </div>
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

export default AjoutRepas;
