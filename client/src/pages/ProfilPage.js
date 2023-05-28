import GoogleLogin from "react-google-login";
import Logo from "../assets/img/logo-login.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import NavBar from "../components/NavBar";
const ProfilPage = () => {
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

  const handleFailure = (result) => {
    // alert(result);
    console.log(result);
  };
  const handleLogin = async (googleData) => {
    // console.log(googleData);
    const res = await fetch("api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    navigate("/profil");
  };

  let nomUser = loginData.name,
    mailuser = loginData.email,
    restuser,
    secteuruser;
  return (
    <>
      <NavBar />
      <div></div>
      <div className="login-section">
        <div className="login-logo-left">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="login-content">
          <div>
            <h3>Profil</h3>
            {/* <button onClick={handleLogout} className="button-delete">
                  Se déconnecter
                </button> */}
            <form action="">
              <table>
                <tr>
                  <td>Nom</td>
                  <td>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      defaultValue={nomUser}
                      //   onChange={(e) => setName(e.target.value)}
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
                      name="ingredient"
                      id="ingredient"
                      defaultValue={mailuser}
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
                      value={restuser}
                      className="name-value"
                      //   onChange={(e) => setRestaurant(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Secteur</td>
                  <td>
                    <input
                      type="text"
                      name="restaurant"
                      value={secteuruser}
                      className="name-value"
                      //   onChange={(e) => setRestaurant(e.target.value)}
                    />
                  </td>
                </tr>
              </table>

              <div className="btn-foot">
                {/* <div className="button-deconnexion" onClick={handleLogout}>
                  <span>
                    <a>Déconnexion</a>
                  </span>
                </div> */}
                <div className="button-deconnexion">
                  <span>
                    <Link to={"/repas"}>Enregistrer</Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilPage;
