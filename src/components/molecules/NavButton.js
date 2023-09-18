import React from "react";
import {navigate} from "gatsby";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  z-index: 50;
`;

const NavButton = () => {
  const handleNavigate = () => {
    navigate(-1);
  };

  return <Button onClick={handleNavigate} />;
};

export default NavButton;

