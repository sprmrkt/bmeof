import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import {useStore} from "../../../utils/store";
import WorkNavLinkTitleBar from "./WorkNavLinkTitleBar";

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

function GlobalNavLinkHolder(props) {
  return (
    <Holder>
      <Inner
        as={motion.div}
        animate={{
          y: props.position,
        }}
        transition={{
          duration: 1,
        }}
      >
        {props.children}
      </Inner>
      {props.title && <WorkNavLinkTitleBar
        index={props.index}
        title={props.title}
        position={props.position}
      />}
    </Holder>
  )
}

GlobalNavLinkHolder.propTypes = {
  position: PropTypes.number.isRequired,
};

export default GlobalNavLinkHolder;