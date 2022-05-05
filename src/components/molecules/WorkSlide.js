import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import MediaItem from "./MediaItem";
import {CSSTransition} from "react-transition-group";

const timeout = 500;

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.1);
  
  &.work-slide-appear,
  &.work-slide-enter {
    transform: translateX(100%);
  }

  &.work-slide-appear-active,
  &.work-slide-appear-done,
  &.work-slide-enter-active,
  &.work-slide-enter-done {
    transform: none;
    transition: transform ${timeout}ms;
  }

  &.work-slide-exit {
    transform: none;
  }

  &.work-slide-exit-active {
    transform: translateX(-100%);
    transition: transform ${timeout}ms;
  }
`

function WorkSlide({slide, active}) {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      in={active}
      timeout={timeout}
      classNames="work-slide"
    >
      <Holder>
        <MediaItem media={slide.primary} />
      </Holder>
    </CSSTransition>
  )
}

WorkSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

export default WorkSlide;