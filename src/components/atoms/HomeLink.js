import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
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
  }
`;

const HomeLink = ({ link, text }) => {
  return (
    <Holder>
      <Link to={link}>{text}</Link>
    </Holder>
  );
};
HomeLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default HomeLink;

