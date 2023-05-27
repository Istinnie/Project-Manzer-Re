import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo-manzer.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div className="menu-root">
        <img src={logo} alt="" className="" />
        <div>
          <ul>
            <li>
              <Link to={"/"}>Accueil</Link>
            </li>
            <li>
              <Link to={"/repas"}>Profil</Link>
            </li>
            <li>
              <Link to={"/ficheRepas"}>Créer un repas</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="log-info">
        <span>Istinnie Velonkasina</span>
        <span className="deconnect-link">
          <Link to={"/"}>Déconnexion</Link>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
