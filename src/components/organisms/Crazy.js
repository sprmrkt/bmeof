import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 90;
  background-color: rgba(255, 0,0,0.2);
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
`;

function ShowCrazy({show}) {
  if (!show) return null;
  return (
    <Holder>
      <p>Crazy</p>
    </Holder>
  )
}

ShowCrazy.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ShowCrazy;