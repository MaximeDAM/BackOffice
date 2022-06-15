import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: { email, password },
    })
      .then((res) => {
        if (res.data.errors) {
        console.log(res.data.errors);
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleLogin} action="" className="signIn-container__form">
      <label htmlFor="user-name">
        Identifiant
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="user-name"
        />
      </label>
      <label htmlFor="password">
        Mot de passe
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </label>
      <input type="submit" value="Connection" />
    </form>
  );
};

export default SignIn;
