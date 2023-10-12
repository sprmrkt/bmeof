import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import StoreNavLinkTitleBar from "./StoreNavLinkTitleBar";

const Holder = styled.div`
  position: relative;
  width: 100%;
  display: block;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  will-change: transform;
`;

function StoreNavLinkHolder(props) {
  return (
    <Holder>
      <Inner
        as={motion.div}
        animate={{
          y: props.position,
        }}
        transition={{
          duration: 0.75,
        }}
      >
        {props.children}
      </Inner>
      {props.title && <StoreNavLinkTitleBar
        index={props.index}
        title={props.title}
        position={props.position}
      />}
    </Holder>
  )
}

StoreNavLinkHolder.propTypes = {
  position: PropTypes.number.isRequired,
};

export default StoreNavLinkHolder;