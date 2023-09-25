import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useStore} from "../../../utils/store";

const Holder = styled.div`
  position: relative;
  width: 100%;
  display: block;
  will-change: transform;
`;

const TitleBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  background: lightgreen !important;
  pointer-events: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  will-change: opacity;
  p {
    margin: 0;
  }
`;

function GlobalNavLinkHolder(props) {
  const {
    workNavSplitIndex,
    setNavUpPosition,
    navUpPosition,
    closeWorkNav
  } = useStore();

  const closeHandler = () => {
    setNavUpPosition(navUpPosition + 50);
    closeWorkNav();
  }

  return (
    <Holder
      as={motion.div}
      animate={{
        y: props.position,
      }}
      transition={{
        duration: 1,
      }}
    >
      {props.children}
      <TitleBar
        even={props.index % 2 === 0}
        as={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: props.index === workNavSplitIndex ? 1 : 0,
        }}
      >
        <p>{props.title}</p>
        <button onClick={() => closeHandler()}>Back</button>
      </TitleBar>
    </Holder>
  )
}

GlobalNavLinkHolder.propTypes = {
  position: PropTypes.number.isRequired,
};

export default GlobalNavLinkHolder;