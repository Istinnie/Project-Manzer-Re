import GoogleLogin from "react-google-login";
import Logo from "../assets/img/logo-login.png";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import NavBar from "../components/NavBar";
const PageLogin = () => {
  const navigate = useNavigate();
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId: process.env.REACT_APP_CLIENT_ID,
      plugin_name: "chat",
    });
  });
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    navigate("/");
  };

  let nomUser = loginData.name,
    mailuser = loginData.email;
  // create new user and his restaurant
  const [nom, setName] = useState(nomUser);
  const [email, setEmail] = useState(mailuser);
  const [restaurant, setRestaurant] = useState();
  const [secteur, setSecteur] = useState();
  const handleSubmit = async (e) => {
    // Prevent the default submit and page reload
    e.preventDefault();
    console.log({
      nom,
      email,
      secteur,
      restaurant,
    });
    // Handle validations
    await axios
      .post("http://localhost:5000/api/user", {
        nom,
        email,
        restaurant,
        secteur,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          alert("Restaurant enregistré avec succès");
          // nom = "";
          // ingredient = "";
        }
        // window.location.reload();
        navigate("/profil");
        // Handle response
      });
  };

  return (
    <>
      <div className="login-section">
        <div className="login-logo-left">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="login-content" style={{ marginTop: "80px" }}>
          <div>
            <h3>Informations du restaurant</h3>

            <form method="post" onSubmit={handleSubmit}>
              <table>
                <tr>
                  <td>Gérant</td>
                  <td>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      value={nom}
                      // onChange={(e) => setName(e.target.value)}
                      className="name-value"
                    />
                    {/* <h3>{getRepas.nom}</h3> */}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={mailuser}
                      //   onChange={(e) => setIngredient(e.target.value)}
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
                      value={restaurant}
                      onChange={(e) => setRestaurant(e.target.value)}
                      className="name-value"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Secteur</td>
                  <td>
                    <select
                      name="secteur"
                      id="secteur"
                      value={secteur}
                      onChange={(e) => {
                        setSecteur(e.target.value);
                      }}
                    >
                      <option value="Nord">Nord</option>
                      <option value="Ouest">Ouest</option>
                      <option value="Sud">Sud</option>
                      <option value="Est">Est</option>
                    </select>
                  </td>
                </tr>
              </table>

              <div className="btn-foot">
                <div className="button-register" onClick={handleLogout}>
                  <span>Déconnexion</span>
                </div>
                <div className="button-register">
                  <input type="submit" value={"Enregistrer"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
