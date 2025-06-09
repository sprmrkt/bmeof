import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/bear.png";
import PropTypes from "prop-types";

const Holder = styled.div`
  padding: 6px 12px 44px 12px;
  display: grid;
  grid-gap: 24px;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  background-color: ${({theme}) => theme.colors.white};
  @media (${props => props.theme.breakpoints.md}) {
    padding: 24px 24px 24px 24px;
    grid-template-columns: 1fr 1fr;
  }
  &.bottom {
    padding: 0 12px 12px 12px;
    @media (${props => props.theme.breakpoints.md}) {
      padding: 12px 24px 24px 24px;
      display: flex;
      justify-content: space-between;
    }
  }

  img {
    width: 50px;
    height: auto;
    display: block;
    @media (${props => props.theme.breakpoints.md}) {
      width: 75px;
    }
  }
  p {
    margin: 0;
  }

  a {
    position: unset !important;
    opacity: unset!important;
    overflow: unset!important;
    font-size: 14px !important;
    line-height: unset!important;
    font-weight: normal;
    font-family: "Gotham", sans-serif;

  }
`;

function Header(props) {
  return (
    <Holder className={props.bottom ? `bottom` : ''}>
      <img src={logo} alt="Bear meets eagle on fire" />
      <p>
        We help good people and brands
        <br /> think and make things differently.
      </p>
      {
        props.bottom &&  <a href="/page/privacy">Privacy policy</a>
      }
    
    </Holder>
  );
}

Header.propTypes = {
  bottom: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  bottom: false,
};

export default Header;

