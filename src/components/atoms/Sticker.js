import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import Draggable from "react-draggable";
import {useWindowSize} from "react-use";
import {randomIntFromInterval} from "../../utils/helpers";

const Holder = styled.div`
  cursor: pointer;
  z-index: 20;
  position: fixed;
  top: ${props => props.y}%;
  left: ${props => props.x}%;

  .gatsby-image-wrapper {
    width: 25vh;
    height: auto;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: 40vh;
      height: auto;
    }
  }
`;

function Sticker(props) {
  const x = randomIntFromInterval(20, 80)
  const y = randomIntFromInterval(20, 80)

  return (
    <Draggable>
      <Holder
        x={x}
        y={y}
      >
        <GatsbyImage
          image={props.sticker.data.image.gatsbyImageData}
          alt={props.sticker.data.image.alt || "sticker"}
        />
      </Holder>
    </Draggable>
  )
}

Sticker.propTypes = {
  sticker: PropTypes.object.isRequired,
};

export default Sticker;