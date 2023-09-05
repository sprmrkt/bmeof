import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import PropTypes from "prop-types";

const Holder = styled.h1`
  cursor: default;
  line-height: 0.75;
  padding-bottom: 1.2rem;
`;

function HeadingOne({ footer }) {
  return (
    <Holder>
      Bear meets eagle on fire
      {!footer && <Element name="heading-one-end"></Element>}
    </Holder>
  );
}

HeadingOne.propTypes = {
  footer: PropTypes.bool,
};

export default HeadingOne;

