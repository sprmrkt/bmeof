import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Holder = styled.div`
  position: relative;
  width: 100%;
  display: block;
  will-change: transform;
`;

function GlobalNavLinkHolder(props) {
  return (
    <Holder
      as={motion.div}
      animate={{
        y: props.position,
      }}
      transition={{
        duration: 1,
      }}>
      {props.children}
    </Holder>
  );
}

GlobalNavLinkHolder.propTypes = {
  position: PropTypes.number.isRequired,
};

export default GlobalNavLinkHolder;

