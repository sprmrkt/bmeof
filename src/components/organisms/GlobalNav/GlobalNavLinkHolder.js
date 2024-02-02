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
    //background-color: rgba(255, 0, 0, 0.5);
    z-index: 1;
    margin-top: -1px;
    will-change: transform;
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

const Inner = styled.div`
    &.isHeader {
        a.button {
            display: block;
            text-decoration: none;
        }
    }
    &.isDefault {
        position: relative;
        a.button, a {
            display: block;
            text-decoration: none;
            opacity: 0;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            line-height: 0;
            font-size: 0;
        }
        p {
            display: block;
            position: relative;
            z-index: 1;
            pointer-events: none;
        }
    }
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
        <Inner className={props.header ? 'isHeader' : 'isDefault'}>{props.children}</Inner>
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
  header: PropTypes.bool.isRequired,
};

GlobalNavLinkHolder.defaultProps = {
  active: false,
  header: false,
};

export default GlobalNavLinkHolder;