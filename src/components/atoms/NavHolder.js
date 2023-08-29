import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  border-bottom: 1px solid;
  padding: 0 15px;
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 0 24px;
  }
`;

const NavHolder = ({ children }) => {
  return <Holder>{children}</Holder>;
};

export default NavHolder;

