import GoogleLogin from "react-google-login";
import Logo from "../assets/img/logo-login.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { gapi } from "gapi-script";

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

  let exist = false;
  const [getUser, setgetUser] = useState([]);

  const fetchGetUser = async () => {
    await axios
      .get(`http://localhost:5000/api/user/${loginData.email}`)
      .then((response) => {
        if (response.data.length >= 1) {
          exist = true; // faire un hook avec cette variable
          setgetUser(response.data[0]);
        }
        console.log(getUser.restaurant);
      });
  };

  useEffect(() => {
    fetchGetUser();
  }, []);

  let nomUser = loginData.name,
    mailuser = loginData.email;
  // create new user and his restaurant
  const [nom, setName] = useState(nomUser);
  const [email, setEmail] = useState(mailuser);
  const [restaurant, setRestaurant] = useState();
  const [secteur, setSecteur] = useState("Nord");
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
        <div
          className="login-content"
          style={{ marginTop: "110px", height: "420px" }}
        >
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
                    {exist ? (
                      <input
                        type="text"
                        name="restaurant"
                        defaultValue={""}
                        onChange={(e) => setRestaurant(e.target.value)}
                        className="name-value"
                      />
                    ) : (
                      // si l'utilisateur existe
                      <input
                        type="text"
                        name="restaurant"
                        value={getUser.restaurant}
                        className="name-value"
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Secteur</td>
                  <td>
                    {exist ? (
                      <select
                        name="secteur"
                        id="secteur"
                        defaultValue={secteur}
                        onChange={(e) => {
                          setSecteur(e.target.value);
                          // console.log(e.target.value);
                        }}
                      >
                        <option value="Nord">Nord</option>
                        <option value="Ouest">Ouest</option>
                        <option value="Sud">Sud</option>
                        <option value="Est">Est</option>
                      </select>
                    ) : (
                      // si l'utilisateur existe
                      <select
                        name="secteur"
                        id="secteur"
                        value={getUser.secteur}
                        disabled
                      >
                        <option value="Nord">Nord</option>
                        <option value="Ouest">Ouest</option>
                        <option value="Sud">Sud</option>
                        <option value="Est">Est</option>
                      </select>
                    )}
                  </td>
                </tr>
              </table>

              <div className="btn-foot" style={{ marginTop: "30px" }}>
                <div className="button-register" onClick={handleLogout}>
                  <span>Déconnexion</span>
                </div>
                {exist ? (
                  <div className="button-register">
                    <input type="submit" value={"Enregistrer"} />
                  </div>
                ) : (
                  <div className="button-register">
                    <Link to={"/repas"}>Continuer</Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
