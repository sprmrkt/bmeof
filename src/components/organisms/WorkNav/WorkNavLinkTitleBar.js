import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useStore} from "../../../utils/store";

const Holder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10000;
  width: 200%;
  height: 48px;
  padding: 0 24px;
  background: lightgreen !important;
  pointer-events: ${({active}) => active ? 'auto' : 'none'};
  opacity: ${({active}) => active ? 1 : 0};
  display: flex;
  justify-content: space-between;
  align-items: center;
  will-change: opacity, transform;

  p {
    margin: 0;
  }
`;

function WorkNavLinkTitleBar(props) {
  const {
    workNavSplitIndex,
    navUpPosition,
    setNavUpPosition,
    closeWorkNav,
  } = useStore();

  const closeHandler = () => {
    setNavUpPosition(navUpPosition + 50);
    closeWorkNav();
  }

  return (
    <Holder
      even={(props.index + 1) % 2 === 0}
      as={motion.div}
      active={props.index === workNavSplitIndex}
      animate={{
        y: props.position,
        x: props.index === workNavSplitIndex && (props.index + 1) % 2 === 0 ? '-50%' : 0,
      }}
      transition={{
        duration: 1,
      }}
    >
      <p>{props.title}</p>
      <button onClick={() => closeHandler()}>Back</button>
    </Holder>
  )
}

WorkNavLinkTitleBar.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default WorkNavLinkTitleBar;