import GoogleLogin from "react-google-login";
import Logo from "../assets/img/logo-login.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import NavBar from "../components/NavBar";
import axios from "axios";
const ProfilPage = () => {
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

  //   let mailuser = loginData.email;
  const [getUser, setgetUser] = useState([]);

  const fetchGetUser = async () => {
    // console.log(process.env.REACT_APP_HOST_USER + "/" + loginData.email);
    await axios
      .get(process.env.REACT_APP_HOST_USER + "/" + loginData.email)
      .then((response) => {
        setgetUser(response.data[0]);
      });
  };

  useEffect(() => {
    fetchGetUser();
  }, []);

  // ----------------------
  // update step
  // ----------------------
  const [nom, setName] = useState(loginData.name);
  const [email, setEmail] = useState(loginData.email);
  const [restaurant, setRestaurant] = useState();
  const [secteur, setSecteur] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ nom, email, restaurant, secteur });

    await axios
      .put(process.env.REACT_APP_HOST_USER + "/" + email, {
        nom,
        email,
        restaurant,
        secteur,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert("Informations modifiées avec succès");
        }

        window.location.reload();
        // Handle response
      });
  };
  //   console.log(getUser.secteur);
  return (
    <>
      <NavBar />
      <div></div>
      <div className="login-section">
        <div className="login-logo-left">
          <img src={Logo} alt="Logo" />
        </div>
        <div
          className="login-content"
          style={{ height: "360px", marginTop: "90px" }}
        >
          <div>
            <h3>Profil</h3>
            {/* <button onClick={handleLogout} className="button-delete">
                  Se déconnecter
                </button> */}
            <form method="post" onSubmit={handleSubmit}>
              <table>
                <tr>
                  <td>Nom</td>
                  <td>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      value={getUser.nom}
                      //   onChange={(e) => setName(e.target.value)}
                      className="name-value"
                    />
                    {/* <h3>{getUser.nom}</h3> */}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input
                      type="text"
                      name="ingredient"
                      id="ingredient"
                      value={getUser.email}
                      //   onChange={(e) => setEmail(e.target.value)}
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
                      value={getUser.restaurant}
                      className="name-value"
                      // onChange={(e) => setRestaurant(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Secteur</td>
                  <td>
                    <select
                      name="secteur"
                      id="secteur"
                      value={getUser.secteur}
                      //   defaultValue={{
                      //     value: getUser.secteur,
                      //   }}
                      onChange={(e) => {
                        setSecteur(e.target.value);
                      }}
                      disabled
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
                {/* <div>
                  <span className="button-register">
                    <input type="submit" value={"Modifier"} />
                  </span>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilPage;
