import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import MediaItem from "./MediaItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const timeout = 500;

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);

  &.right-to-left-appear,
  &.right-to-left-enter {
    transform: translateX(100%);
  }

  &.right-to-left-appear-active,
  &.right-to-left-appear-done,
  &.right-to-left-enter-active,
  &.right-to-left-enter-done {
    transform: none;
    transition: transform ${timeout}ms;
  }

  &.right-to-left-exit {
    transform: none;
  }

  &.right-to-left-exit-active {
    transform: translateX(-100%);
    transition: transform ${timeout}ms;
  }

  &.left-to-right-appear,
  &.left-to-right-enter {
    transform: translateX(-100%);
  }

  &.left-to-right-appear-active,
  &.left-to-right-appear-done,
  &.left-to-right-enter-active,
  &.left-to-right-enter-done {
    transform: none;
    transition: transform ${timeout}ms;
  }

  &.left-to-right-exit {
    transform: none;
  }

  &.left-to-right-exit-active {
    transform: translateX(100%);
    transition: transform ${timeout}ms;
  }
`

function WorkSlides({slides, currentSlide, isNext}) {

  // Method for this left to right and then right to left animation is from here:
  // https://stackoverflow.com/questions/69809477/right-and-left-sliding-with-react-transition-group

  return (
    <TransitionGroup childFactory={child => React.cloneElement(child, {
      classNames: isNext ? "right-to-left" : "left-to-right",
      timeout: timeout
    })}>
      <CSSTransition
        key={currentSlide}
        timeout={timeout}
        classNames="right-to-left"
      >
        <Holder>
          <MediaItem media={slides[currentSlide].primary} />
        </Holder>
      </CSSTransition>
    </TransitionGroup>
  )
}

WorkSlides.propTypes = {
  slides: PropTypes.array.isRequired,
  currentSlide: PropTypes.number.isRequired,
  isNext: PropTypes.bool.isRequired,
};

export default WorkSlides;