import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
document.querySelector(".password-error").innerHTML = "Les mots de passe ne correspondent pas"
    } else {
      axios
        .post(`${process.env.REACT_API_URL}/register`, {
          pseudo,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      action=""
      className="signIn-container__form"
    >
      <label htmlFor="user-name">
        Identifiant
        <input
          onChange={(e) => setPseudo(e.target.value)}
          type="text"
          id="user-name"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
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
      <label htmlFor="confirm-password">
        Confirmation mot de passe
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirm-password"
        />
      </label>
      <p className="password-error"></p>
      <input type="submit" value="Validation" />
    </form>
  );
};

export default SignUp;
