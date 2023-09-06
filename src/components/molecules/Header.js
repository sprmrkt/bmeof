import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/bear.png";

const Holder = styled.div`
  padding: 6px 12px 0 12px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  margin-bottom: 44px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 24px 0 24px;
    grid-template-columns: 1fr 1fr;
  }

  img {
    width: 50px;
    height: auto;
    display: block;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: 75px;
    }
  }
`;

function Header() {
  return (
    <Holder>
      <img src={logo} alt="Bear meets eagle on fire" />
      <p>We help good people and brands<br /> think and make things differently.</p>
    </Holder>
  );
}

export default Header;
