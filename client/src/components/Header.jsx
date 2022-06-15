import React, { useState } from "react";
import Navbar from "./Navbar";
import logo from "../styles/assets/img/logo.png";
import axios from "axios";

const Header = ({ auth }) => {
  const [pseudo, setPseudo] = useState("");

  if (auth) {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/${auth}`,
      withCredentials: true,
    })
      .then((res) => {
        setPseudo(res.data.pseudo);
      })
      .catch((err) => console.log(err));
  }
 
 const handleLogOut = () => {
  axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
    withCredentials: true,
  })
    .then(() => {
        window.location = "/";
    })
    .catch((err) => console.log(err));
  }

  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <h2>Backoffice Projet</h2>
      {auth && (
        <>
          <h3 className="header__nameHead">Bienvenue {pseudo}</h3>
          <Navbar />
          <button onClick={handleLogOut}>Se déconnecter</button>
        </>
      )}
    </header>
  );
};

export default Header;
