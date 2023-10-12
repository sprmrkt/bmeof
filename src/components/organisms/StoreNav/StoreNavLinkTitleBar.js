import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useStore} from "../../../utils/store";
import {useWindowSize} from "react-use";

const Holder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  background: ${({theme}) => theme.colors.white}; !important;
  pointer-events: ${({$active}) => $active ? 'auto' : 'none'};
  opacity: ${({$active}) => $active ? 1 : 0};
  display: flex;
  justify-content: space-between;
  align-items: center;
  will-change: opacity, transform;
  @media (${props => props.theme.breakpoints.md}) {
    width: 200%;
  }
  p {
    margin: 0;
  }
`;

const Border = styled.div`
  position: absolute;
  top: calc(100% - 2px);
  left: 0;
  width: 100%;
  height: 2px;
  background-color: black;
  transform-origin: right;
  will-change: transform;
`;

function StoreNavLinkTitleBar(props) {
  const {
    storeNavSplitIndex,
    navUpPosition,
    setNavUpPosition,
    closeStoreNav,
  } = useStore();
  const size = useWindowSize();

  const closeHandler = () => {
    setNavUpPosition(navUpPosition + 50);
    closeStoreNav();
  }

  return (
    <Holder
      as={motion.div}
      $active={props.index === storeNavSplitIndex}
      animate={{
        y: props.position,
        x: props.index === storeNavSplitIndex && (props.index + 1) % 2 === 0 && size.width >= 768 ? '-50%' : 0,
      }}
      transition={{
        duration: 0.75,
      }}
    >
      <Border
        as={motion.div}
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: props.index === storeNavSplitIndex ? 1 : 0,
        }}
        transition={{
          duration: 0.75,
        }}
      />
      <p>{props.title}</p>
      <button onClick={() => closeHandler()}>Back</button>
    </Holder>
  )
}

StoreNavLinkTitleBar.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default StoreNavLinkTitleBar;