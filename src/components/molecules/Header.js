import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/bear.png";
import PropTypes from "prop-types";

const Holder = styled.div`
  padding: 6px 12px 44px 12px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
  @media (${props => props.theme.breakpoints.md}) {
    padding: 24px 24px 24px 24px;
    grid-template-columns: 1fr 1fr;
  }
  &.bottom {
    padding: 0 12px 12px 12px;
    @media (${props => props.theme.breakpoints.md}) {
      padding: 12px 24px 24px 24px;
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
`;

function Header(props) {
  return (
    <Holder className={props.bottom ? `bottom` : ''}>
      <img src={logo} alt="Bear meets eagle on fire" />
      <p>
        We help good people and brands
        <br /> think and make things differently.
      </p>
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

