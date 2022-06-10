import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/bear.png";
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";

const Holder = styled.header`
  padding: 6px 12px 0 12px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 3fr;
  align-items: center;
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

  p {
    font-size: 12px;
    line-height: 12px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 15px;
      line-height: 16px;
    }

    br {
      display: none;
      @media ( ${props => props.theme.breakpoints.sm} ) {
        display: inline;
      }
    }
  }
`;

function Header() {
  return (
    <Holder
      className={useHorizontalHoverClassname()}>
      <img src={logo} alt="Bear meets eagle on fire" />
      <p>We help good people and brands<br /> think and make things differently.</p>
    </Holder>
  );
}

export default Header;
