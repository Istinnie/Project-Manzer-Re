import GoogleLogin from "react-google-login";
import Logo from "../assets/img/logo-login.png";
import { useState } from "react";
const PageLogin = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
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
  };

  return (
    <div className="login-section">
      <div className="login-logo-left">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="login-content">
        <h3>Login</h3>
        <div>
          {loginData ? (
            <div>
              <h3>Vous êtes connecté en tant que {loginData.email}</h3>
              <button onClick={handleLogout} className="button-delete">
                Se déconnecter
              </button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Connexion"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
