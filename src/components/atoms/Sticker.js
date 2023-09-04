import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import Draggable from "react-draggable";
import {useWindowSize} from "react-use";

const Holder = styled.div`
  cursor: pointer;
  z-index: 20;
  position: fixed;
  top: ${props => props.y}px;
  left: ${props => props.x}px;

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
  const {height, width} = useWindowSize();
  const x = useRef(Math.floor(Math.random() * (width - 100 + 1)))
  const y = useRef(Math.floor(Math.random() * (height - 200 + 1)))

  return (
    <Draggable>
      <Holder
        x={x.current}
        y={y.current}
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