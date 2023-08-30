import { Link } from "gatsby";
import React from "react";
import NavHolder from "../components/atoms/NavHolder";
import Hello from "../components/organisms/Hello";

const hello = () => {
  return (
    <div>
      <NavHolder>
        <Link to="/">Back</Link>
      </NavHolder>
      <Hello />
    </div>
  );
};

export default hello;

