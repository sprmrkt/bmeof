import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Holder = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  border-bottom: 1px solid;
  width: 100%;
  padding: 0 15px;
  @media (${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    padding: 0 24px;
  }
`;

function WorkTileText({ title }) {
  return (
    <Holder>
      <p className="title">
        <strong>{title}</strong>
      </p>

      <Link to="/work">Back</Link>
    </Holder>
  );
}

WorkTileText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default WorkTileText;

