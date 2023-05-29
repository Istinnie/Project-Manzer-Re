import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo-manzer.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
function NavBar() {
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

    // si le restaurant n'existe pas encore

    navigate("/addProfil");
    // si le resto existe déjà
    // navigate("/profil")
  };
  // source : https://www.google.com/search?q=login+google+using+react+js&rlz=1C1VDKB_frRE1013RE1013&sxsrf=APwXEdd2sbMqi-8rEFxv5EYlWJrZrKIYcg%3A1685186326654&ei=FudxZPiuJ4mTkdUPqb-9wAk&ved=0ahUKEwj4kYWjsJX_AhWJSaQEHalfD5gQ4dUDCA8&uact=5&oq=login+google+using+react+js&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAE6BwgjEOoCECc6CAgAEIoFEJECOgUIABCABDoLCC4QgAQQxwEQ0QM6BQguEIAEOgwIIxCKBRATEIAEECc6BAgjECc6BwgjEIoFECc6BwgAEIoFEEM6BQgAEMsBOgsILhDHARCvARDLAToGCAAQFhAeOggIABCKBRCGAzoICAAQCBAeEA1KBAhBGABQoBpYsHxghH5oAXABeACAAcgFiAG7SJIBDDItMy4xOS4xLjIuMZgBAKABAbABCsABAQ&sclient=gws-wiz-serp#fpstate=ive&vld=cid:3fb0beea,vid:75aTZq-qoZk
  return (
    <nav>
      {loginData ? (
        <div>
          <div className="menu-root">
            <img src={logo} alt="" className="" />
            <div>
              <ul>
                <li>
                  <Link to={"/Project-Manzer-Re"}>Accueil</Link>
                </li>
                <li>
                  <Link to={"/repas"}>Nos repas</Link>
                </li>
                <li>
                  <Link to={"/ficheRepas"}>Créer un repas</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="log-info">
            <div className="deconnect-bloc">
              <span className="mail-content">
                <Link to={"/profil"}>{loginData.email}</Link>
              </span>
              <span className="deconnect-link">
                <a onClick={handleLogout} className="deconnect-link">
                  Déconnexion
                </a>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="menu-root">
            <img src={logo} alt="" className="" />
            <div>
              <ul>
                <li>
                  <Link to={"/Project-Manzer-Re"}>Accueil</Link>
                </li>
                {/* <li>
                  <Link to={"/repas"}>Profil</Link>
                </li>
                <li>
                  <Link to={"/ficheRepas"}>Créer un repas</Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="log-info">
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Connexion"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
              className="connect-link"
            ></GoogleLogin>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
