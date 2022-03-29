import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/bear.png";

const Holder = styled.header`
  padding: 24px 24px 0 24px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  @media( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 75px;
    height: auto;
    display: block;
  }
  p {
    text-transform: uppercase;
  }
`;

function Header() {
    return (
      <Holder>
        <img src={logo} alt="Bear meets eagle on fire"/>
        <p>We help good brands and people think<br/> and make things differently.</p>
      </Holder>
    );
}

export default Header;
