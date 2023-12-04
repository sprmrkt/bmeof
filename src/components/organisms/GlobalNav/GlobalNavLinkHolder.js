import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useStore} from "../../../utils/store";

const Holder = styled.div`
  position: relative;
  width: 100%;
  display: block;
  background-color: ${({theme}) => theme.colors.white};
  z-index: 1;
  will-change: transform;

  a.button {
    display: block;
    text-decoration: none;
    font-size: 35vw;
  }
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

const Close = styled.button`
  position: absolute;
  top: calc(100% - 48px);
  z-index: 10;
  left: 0;
  width: 100%;
  height: 48px;
  background: transparent !important;
  pointer-events: auto;
  opacity: 0.2;
`;

function GlobalNavLinkHolder(props) {
  const {closeNav, hoverRight} = useStore();

  return (
    <Holder
      as={motion.div}
      animate={{
        y: props.position,
      }}
      transition={{
        duration: 0.75,
      }}
    >
      <motion.div
        className="global-nav-inner"
        animate={{x: hoverRight ? '-22%' : 0}}
        transition={{duration: 0.5}}>
        {props.children}
      </motion.div>
      <Border
        as={motion.div}
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: props.active ? 1 : 0,
        }}
        transition={{
          duration: 0.75,
        }}
      />
      {props.active && <Close onClick={() => closeNav()} />}
    </Holder>
  )
}

GlobalNavLinkHolder.propTypes = {
  active: PropTypes.bool,
  position: PropTypes.number.isRequired,
};

GlobalNavLinkHolder.defaultProps = {
  active: false,
};

export default GlobalNavLinkHolder;