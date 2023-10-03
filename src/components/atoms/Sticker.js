import React, {useMemo, useRef} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import {motion} from "framer-motion"

import {randomIntFromInterval} from "../../utils/helpers";
import {useStore} from "../../utils/store";

const Holder = styled.div`
  cursor: pointer;
  z-index: 200;
  position: fixed;
  top: ${({y}) => y}vh;
  left: ${({x}) => x}vw;
  width: 15vh;
  aspect-ratio: 1/1;
  @media (${({theme}) => theme.breakpoints.md}) {
    width: 30vh;
  }
`;
const Area = styled.div`
  position: fixed;
  top: -5%;
  left: -5%;
  bottom: -5%;
  right: -5%;
  pointer-events: none;
`;

function Sticker(props) {
  const x = useMemo(() => randomIntFromInterval(20, 80), []);
  const y = useMemo(() => randomIntFromInterval(20, 80), []);
  const constraintsRef = useRef(null);

  return (
    <>
      <Area as={motion.div} ref={constraintsRef}/>
      <Holder
        as={motion.div}
        drag
        dragElastic={0.9}
        dragConstraints={constraintsRef}
        x={x} y={y}>
        <GatsbyImage
          objectFit="contain"
          image={props.sticker.data.image.gatsbyImageData}
          alt={props.sticker.data.image.alt || "sticker"}
        />
      </Holder>
    </>
  );
}

Sticker.propTypes = {
  sticker: PropTypes.object.isRequired,
};

export default Sticker;

