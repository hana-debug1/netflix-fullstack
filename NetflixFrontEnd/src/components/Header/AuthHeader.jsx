import React from "react";
import logo from "../../assets/images/logo.png";

function AuthHeader() {
  return (
    <header className="absolute left-0 top-0 z-20 px-8 py-2">
      <img className="w-44" src={logo} alt="Netflix" />
    </header>
  );
}

export default AuthHeader;
