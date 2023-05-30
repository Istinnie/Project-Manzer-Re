import GoogleLogin from "react-google-login";
import Logo from "../assets/img/logo-login.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { gapi } from "gapi-script";
import ClipLoader from "react-spinners/ClipLoader";
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
    navigate("/Project-Manzer-Re");
  };

  // test if user exists in db
  const [Joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(true);

  const [getUser, setgetUser] = useState([]);

  const fetchGetUser = async () => {
    await axios
      .get(process.env.REACT_APP_HOST_USER + "/" + loginData.email)
      //.get(`http://localhost:5000/api/user/aaaaa`)
      .then((response) => {
        setgetUser(response.data[0]);
        setJoke([...Joke, response.data[0]]);
        setLoading(false);
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
  const [restaurant, setRestaurant] = useState("");
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
      .post(process.env.REACT_APP_HOST_USER, {
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
  // ---------------existe : cas 1 ---n'existe pas : cas 2-----------

  let jokesArray, secteurArray, valideBtn;
  console.log(Joke[0]?.length, Joke[0]);
  if (typeof Joke[0] !== "undefined") {
    // si l'utilisateur existe

    jokesArray = Joke.map((el) => {
      return (
        <input
          type="text"
          name="restaurant"
          value={el.restaurant}
          className="name-value"
        />
      );
    });
    secteurArray = Joke.map((el) => {
      return (
        <select name="secteur" id="secteur" value={el.secteur} disabled>
          <option value="Nord">Nord</option>
          <option value="Ouest">Ouest</option>
          <option value="Sud">Sud</option>
          <option value="Est">Est</option>
        </select>
      );
    });
    valideBtn = Joke.map((el) => {
      return <Link to={"/repas"}>Continuer</Link>;
    });
  } else {
    // si l'utilisateur n'existe pas
    jokesArray = Joke.map(() => {
      return (
        <input
          type="text"
          name="restaurant"
          defaultValue={""}
          onChange={(e) => setRestaurant(e.target.value)}
          className="name-value"
        />
      );
    });
    secteurArray = Joke.map(() => {
      return (
        <select
          name="secteur"
          id="secteur"
          defaultValue={secteur}
          onChange={(e) => {
            setSecteur(e.target.value);
          }}
        >
          <option value="Nord">Nord</option>
          <option value="Ouest">Ouest</option>
          <option value="Sud">Sud</option>
          <option value="Est">Est</option>
        </select>
      );
    });
    valideBtn = Joke.map((el) => {
      return (
        <input
          type="submit"
          value={"Enregistrer"}
          style={{ marginTop: "0px" }}
        />
      );
    });
  }
  // ---------------------------
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
                  <td>{loading ? <ClipLoader /> : jokesArray}</td>
                </tr>
                <tr>
                  <td>Secteur</td>
                  <td>{loading ? <ClipLoader /> : secteurArray}</td>
                </tr>
              </table>

              <div className="btn-foot" style={{ marginTop: "30px" }}>
                <div className="button-register" onClick={handleLogout}>
                  <span>Déconnexion</span>
                </div>
                <div className="button-register">
                  {loading ? <ClipLoader /> : valideBtn}
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
