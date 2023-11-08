import React, {useMemo} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import Draggable from "react-draggable";

import {randomIntFromInterval} from "../../utils/helpers";
import {useStore} from "../../utils/store";

const Holder = styled.div`
  cursor: pointer;
  z-index: 200;
  position: absolute;
  top: ${({y}) => y}vh;
  left: ${({x}) => x}vw;

  transition: opacity 150ms linear;

  pointer-events: ${({active}) => (active ? "auto" : "none")};
  opacity: ${({active}) => (active ? "1" : "0")};

  z-index: ${({active}) => (active ? "200" : "0")};

  .gatsby-image-wrapper {
    width: 25vh;
    height: auto;
    @media (${({theme}) => theme.breakpoints.md}) {
      width: 40vh;
      height: auto;
    }
  }
`;

function Sticker({sticker, src, className}) {
  // store
  const {navActive} = useStore();

  const cols = sticker?.data?.columns;
  const rows = sticker?.data?.rows;


  const x = useMemo(() => randomIntFromInterval(20, 80), []);
  const y = useMemo(() => randomIntFromInterval(20, 80), []);

  return (
    <Draggable>
      <Holder x={x} y={y} active={navActive}>
        {src ? (
          <img src={src} draggable="false" className={className} />
        ) : (
          <GatsbyImage
            className={className}
            image={sticker.data.image.gatsbyImageData}
            alt={sticker.data.image.alt || "sticker"}
          />
        )}
      </Holder>
    </Draggable>
  );
}

Sticker.propTypes = {
  sticker: PropTypes.object,
  src: PropTypes.string,
};

export default Sticker;

