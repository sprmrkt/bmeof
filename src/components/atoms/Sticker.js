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
  position: absolute;
  top: ${({y}) => y}vh;
  left: ${({x}) => x}vw;
  width: 15vh;
  aspect-ratio: 1/1;
  @media (${({theme}) => theme.breakpoints.md}) {
    width: 30vh;
  }
`;
const Area = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
`;

function Sticker(props) {
  const x = randomIntFromInterval(20, 80);
  const y = randomIntFromInterval(20, 80);
  const constraintsRef = useRef(null);
  const {hoverRight} = useStore();

  return (
    <>
      <Area as={motion.div} ref={constraintsRef} />
      <Holder
        as={motion.div}
        drag
        dragElastic={0.9}
        dragConstraints={constraintsRef}
        x={x} y={y}>
        <motion.div
          className="global-nav-inner"
          animate={{x: hoverRight ? '-22vw' : 0}}
          transition={{duration: 0.5}}>
          <GatsbyImage
            objectFit="contain"
            image={props.sticker.data.image.gatsbyImageData}
            alt={props.sticker.data.image.alt || "sticker"}
          />
        </motion.div>
      </Holder>
    </>
  );
}

Sticker.propTypes = {
  sticker: PropTypes.object.isRequired,
};

export default Sticker;

