import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";

const Holder = styled.div`
    position: relative;
    width: 100%;
    display: block;
    background-color: ${({theme}) => theme.colors.white};
    z-index: 1;
    margin-top: -1px;
`;

const HoverButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 5%;
    height: 100%;
    background: transparent !important;
    pointer-events: auto;
    opacity: 0;
`;

const Border = styled.div`
    position: absolute;
    top: calc(100% - 1px);
    left: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    transform-origin: right;
    will-change: transform;
`;

const Inner = styled.div`
    position: relative;
    p {
        display: block;
        position: relative;
        z-index: 1;
        pointer-events: none;
    }
`;

function LongTitleHolder(props) {
  const [hoverRight, setHoverRight] = useState(false);

  return (
    <Holder>
      <motion.div
        animate={{x: hoverRight ? `-${props.movementPosition}%` : 0}}
        transition={{duration: props.movementDuration}}>
        <Inner>{props.children}</Inner>
      </motion.div>
      <Border />
      <HoverButton
        onMouseOver={() => setHoverRight(true)}
        onMouseOut={() => setHoverRight(false)}
      />
    </Holder>
  )
}

LongTitleHolder.propTypes = {
  movementPosition: PropTypes.number.isRequired,
  movementDuration: PropTypes.number.isRequired,
};

LongTitleHolder.defaultProps = {
  movementPosition: 22,
  movementDuration: 0.5,
};

export default LongTitleHolder;