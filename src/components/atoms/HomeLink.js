import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { manualKerning } from "../../utils/helpers";
import PropTypes from "prop-types";

const Holder = styled.div`
  a {
    line-height: 0.77;
    font-size: 33.5vw;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    overflow: hidden;
    width: 100%;
    text-align: left;
    padding-left: 12px;
    white-space: normal;
    cursor: pointer;

    .large-text-outer {
      @media (${(props) => props.theme.breakpoints.md}) {
        display: inline-block;
      }
    }

    .large-text-wrapper {
      display: inline-block;
    }

    @supports (-moz-appearance: none) {
      .large-text-wrapper {
        display: block;
      }
    }
  }
`;

const HomeLink = ({ link, text }) => {
  console.log("link", link, text);
  return (
    <Holder>
      <Link to={link}>
        <span className="large-text-outer">
          <span className="large-text-wrapper">{manualKerning(text)}</span>
        </span>
      </Link>
    </Holder>
  );
};
HomeLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default HomeLink;

