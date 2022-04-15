import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import classNames from "classnames";

const Holder = styled.div`
  scroll-snap-align: start;
  width: 100%;
  overflow: hidden;
  padding: 0 0 0 12px;
  
  &.has-border {
    border-top: 1px solid;
  }
  
  button {
    font-size: 33.5vw;
    line-height: 0.75;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    display: block;
    padding-top: 15px;
    transition: color 0.5s linear;
    @media( ${props => props.theme.breakpoints.md} ) {
      padding-top: 24px;
    }
    @supports (-moz-appearance:none) {
      span {
        display: block;
        transform: translateY(10%);
      }
    }

    &:hover {
      @media ( ${props => props.theme.breakpoints.md} ) {
        color: rgb(70, 70, 70);
      }
    }
  }
`;

const Copyright = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 3fr;
  align-items: end;
  padding: 0 15px 48px;
  @media( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
    padding: 0 24px 48px;
  }
  p {
    text-transform: uppercase;
    font-size: 12px;
    line-height: 12px;
    @media( ${props => props.theme.breakpoints.md} ) {
      font-size: initial !important;
      line-height: initial !important;
    }
    br {
      display: none;
      @media( ${props => props.theme.breakpoints.sm} ) {
        display: inline;
      }
    }
  }
`;

function CloseButton({closeHandler, border}) {
  const holderClasses = classNames('close-button', { 'has-border': border })
  return (
    <>
      <Holder className={holderClasses}>
        <button onClick={() => closeHandler()}><span>Close</span></button>
      </Holder>
      <Copyright className="close-copyright">
        <p>&copy;</p>
        <p>We help good brands and people think<br /> and make things differently.</p>
      </Copyright>
    </>
  )
}

CloseButton.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  border: PropTypes.bool
};

CloseButton.defaultProps = {
  border: true
};

export default CloseButton;