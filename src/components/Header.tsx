import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-20 px-10 mx-auto">
      <NavLink to="/">
        <div>ProManager</div>
      </NavLink>
      <div>
        <h1>
          <span>Don't have an Account ?</span>{" "}
          <NavLink to="/sign-up">
            <span>Sign up</span>
          </NavLink>
        </h1>
      </div>
    </div>
  );
};

export default Header;
