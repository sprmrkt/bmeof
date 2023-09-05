import React from "react";
import { manualKerning } from "../../utils/helpers";
import { Element } from "react-scroll";
import styled from "styled-components";
import PropTypes from "prop-types";

const Holder = styled.h1`
  cursor: default;
  line-height: 0.75;
  padding-bottom: 1.2rem;

  .large-text-outer {
    @media (${(props) => props.theme.breakpoints.md}) {
      display: inline-block;
    }
  }
`;

function HeadingOne({ footer }) {
  return (
    <Holder>
      <span className={`large-text-outer`}>
        <span className="large-text-wrapper">
          {manualKerning("Bear meets eagle on fire")}
        </span>
      </span>
      {!footer && <Element name="heading-one-end"></Element>}
    </Holder>
  );
}

HeadingOne.propTypes = {
  footer: PropTypes.bool,
};

export default HeadingOne;

