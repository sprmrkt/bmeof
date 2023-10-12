import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";

import {useStore} from "../../utils/store";
import {manualKerning} from "../../utils/helpers";

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
`;

const Holder = styled.div`
  width: 100%;
  overflow: hidden;
  padding-top: 48px;
  @media (${props => props.theme.breakpoints.md}) {
    padding: 0 0 0 12px;
  }

  &.has-border {
    border-top: 1px solid;
  }

  button {
    display: block;
    padding: 12px 0;
    transition: color 0.5s linear;

    @media (${props => props.theme.breakpoints.md}) {
      padding: 12px 0 24px 0;
    }

    &:hover {
      @media (${props => props.theme.breakpoints.md}) {
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
  padding: 0 15px calc(15px + 48px);
  @media (${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    padding: 0 24px;
  }
  p {
    margin-bottom: 12px;
    margin-top: 0;
    @media (${props => props.theme.breakpoints.md}) {
      margin-bottom: 24px;
      margin-top: 0;
    }
  }
`;

function CloseButton({border}) {
  const holderClasses = classNames("close-button", {"has-border": border});
  const { closeNav } = useStore();

  const clickHandler = () => {
    closeNav();
  }

  return (
    <Container>
      <Holder className={holderClasses}>
        <button onClick={() => clickHandler()} className="h1">
          {manualKerning(`Close`)}
        </button>
      </Holder>
      <Copyright className="close-copyright">
        <p>&copy;</p>
        <p>
          We help good people and brands
          <br /> think and make things differently.
        </p>
      </Copyright>
    </Container>
  );
}

CloseButton.propTypes = {
  border: PropTypes.bool,
};

CloseButton.defaultProps = {
  border: true,
};

export default CloseButton;

