import React from "react";
import {Link} from "gatsby";
import styled from "styled-components";

const Button = styled(Link)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  z-index: 50;
`;

const NavButton = ({link}) => {
  return <Button to={link} />;
};

export default NavButton;

