import { Link } from "gatsby";
import React from "react";
import NavHolder from "../components/atoms/NavHolder";
import Studio from "../components/organisms/Studio";

const studio = () => {
  return (
    <div>
      <NavHolder>
        <Link to="/">Back</Link>
      </NavHolder>
      <Studio />
    </div>
  );
};

export default studio;

