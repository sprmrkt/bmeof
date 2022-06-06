import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import classNames from "classnames";
import {useStore} from "../../utils/store";
import {useWindowSize} from "react-use";

const Button = styled.button`
  font-size: 33.5vw;
  line-height: 0.75;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  display: block;
  overflow: hidden;
  width: 100%;
  text-align: left;
  padding-left: 12px;
  transition: all 0.25s linear;
  white-space: normal;
  position: relative;

  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
      transition: transform 1s linear;
    }
  }

  .large-text-wrapper {
    display: inline-block;
    transition: transform 0.25s linear;
  }

  &:hover {
    @media ( ${props => props.theme.breakpoints.md} ) {
      color: rgb(70, 70, 70);
    }
  }

  &.is-open {
    .large-text-wrapper {
      transform: translateY(-8px);
    }

    @media ( ${props => props.theme.breakpoints.md} ) {
      .large-text-wrapper {
        transform: translateY(-0.04em);
      }
    }
  }

  @supports (-moz-appearance:none) {
    .large-text-wrapper {
      display: block;
      transform: translateY(0.1em);
    }

    &.is-open {
      @media ( ${props => props.theme.breakpoints.md} ) {
        .large-text-wrapper {
          transform: translateY(0.06em);
        }
      }
    }
  }

  &.is-moved {
    @media ( ${props => props.theme.breakpoints.md} ) {
      .large-text-outer {
        transform: translateX(calc(-${props => props.moveDistance}px - 24px));
      }
    }
  }
  
`;

function AccordionButton({open, toggleOpen, text}) {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const setHorizontalHoverDistance = useStore(state => state.setHorizontalHoverDistance);
  const size = useWindowSize();
  const textRef = useRef(null);
  const accordionIsOpen = useStore(state => state.accordionIsOpen);
  const horizontalHoverDistance = useStore(state => state.horizontalHoverDistance);
  const horizontalHover = useStore(state => state.horizontalHover);

  useEffect(() => {
    if(textRef.current) {
      setHorizontalHoverDistance(textRef.current.clientWidth - size.width)
    }
  }, [size.width, textRef]);

  const buttonClasses = classNames('accordion-title', {
    'is-open': open,
    'is-moved': horizontalHover && !accordionIsOpen
  });

  return (
    <Button
      className={buttonClasses}
      onMouseEnter={() => setCustomCursorIsVisible(true)}
      onMouseLeave={() => setCustomCursorIsVisible(false)}
      moveDistance={horizontalHoverDistance}
      onClick={() => toggleOpen()}>
      <span ref={textRef} className="large-text-outer">
        <span className="large-text-wrapper">{text}</span>
      </span>
    </Button>
  )
}

AccordionButton.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AccordionButton;