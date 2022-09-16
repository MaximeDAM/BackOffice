import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Signs = () => {
  const [signUpModal, setSignUpModal] = useState(true); // inscription

  const handleSignUp = (e) => {
    if (e.target.className !== "active-btn") {
      setSignUpModal(!signUpModal);
    }
  };

  return (
    <div className="signIn-container">
      <ul>
        <li
          onClick={handleSignUp}
          className={signUpModal ? "active-btn" : null}
        >
          Inscription
        </li>
        <li
          onClick={handleSignUp}
          className={signUpModal ? null : "active-btn"}
        >
          Connection
        </li>
      </ul>
      {signUpModal ? <SignUp onSignInModal={() => setSignUpModal(false)} /> : <SignIn />}
    </div>
  );
};

export default Signs;
