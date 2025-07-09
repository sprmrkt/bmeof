import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/bear.png";
import PropTypes from "prop-types";
import {Link, navigate} from "gatsby";
import {useStore} from "../../utils/store";

const Holder = styled.div`
    padding: 6px 12px 44px 12px;
    display: grid;
    grid-gap: 12px 24px;
    justify-items: start;
    align-items: center;
    grid-template-columns: 1fr 3fr;
    background-color: ${({theme}) => theme.colors.white};
    position: relative;
    z-index: 20;
    @media (${props => props.theme.breakpoints.md}) {
        padding: 24px 24px 24px 24px;
        grid-template-columns: 4fr 3fr 1fr;
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
    .pp-link {
        grid-column: 2/3;
        pointer-events: auto !important;
        @media (${props => props.theme.breakpoints.md}) {
            margin-top: 16px;
            grid-column: span 1;
            text-align: right;
        }
    }
    p {
        margin: 0;
    }

    a {
        position: unset !important;
        opacity: unset !important;
        overflow: unset !important;
        font-size: inherit !important;
        line-height: inherit !important;
        font-weight: normal;
        font-family: "Gotham", sans-serif;
    }
`;

function Header(props) {
  const {closeNav} = useStore();
  const clickHandler = () => {
    closeNav();
    navigate("/");
  }
  return (
    <Holder className={props.bottom ? `bottom` : ''}>
      <button onClick={() => clickHandler()} >
        <img src={logo} alt="Bear meets eagle on fire" />
      </button>

      {!props.hideText && <p>
        We help good people and brands
        <br /> think and make things differently.
      </p>}
      {
        props.bottom && <p className="pp-link"><Link to="/page/privacy">Privacy policy</Link></p>
      }
    </Holder>
  );
}

Header.propTypes = {
  bottom: PropTypes.bool.isRequired,
  hideText: PropTypes.bool,
};

Header.defaultProps = {
  bottom: false,
  hideText: false,
};

export default Header;

