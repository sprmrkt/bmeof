import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Element, scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from 'uuid';
import useWindowSize from "../../hooks/useWindowSize";
import LockScroll from "./LockScroll";

const scrollTime = 500;
const timeout = 3000;


const Content = styled.div`
  width: 100%;
  position: relative;

  .accordion-inner {
    overflow: hidden;

    > :first-child { margin-top: 0; }

    > :last-child { margin-bottom: 0; }
  }

  .border {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.black};
    transform-origin: top left;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    &:last-child {
      top: auto;
      bottom: -1px;
    }
  }

  &.accordion-content-appear,
  &.accordion-content-enter {
    .accordion-inner {
      height: 0;
    }

    .border {
      transform: scaleX(0);
    }
  }

  &.accordion-content-appear-active,
  &.accordion-content-appear-done,
  &.accordion-content-enter-active,
  &.accordion-content-enter-done {
    .accordion-inner {
      height: calc(100vh - ${props => props.offset}px);
      transition: height ${timeout * 0.75}ms ${timeout * 0.25 + scrollTime}ms;
    }

    .border {
      transform: scaleX(1);
      transition: transform ${timeout * 0.25}ms ${scrollTime}ms;
    }
  }

  &.accordion-content-exit {
    .accordion-inner {
      height: calc(100vh - ${props => props.offset}px);
    }

    .border {
      transform: scaleX(1);
    }
  }

  &.accordion-content-exit-active {
    .accordion-inner {
      height: 0;
      transition: height ${timeout * 0.75}ms;
    }

    .border {
      transform: scaleX(0);
      transition: transform ${timeout * 0.25}ms ${timeout * 0.75}ms;
    }
  }
`;

function Accordion({button, children, id, scrollAfterOpen}) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const uid = uuidv4();
  const buttonRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    if (buttonRef.current) {
      setOffset(buttonRef.current.offsetHeight);
    }
  }, [size.width]);

  useEffect(() => {
    if (open) {

      let options = {
        duration: scrollTime,
        smooth: true,
        offset: offset * 0.8,
      }
      if( scrollAfterOpen ) options.delay = timeout + scrollTime;

      scroller.scrollTo(uid, options);
    }
  }, [open, uid, offset, scrollAfterOpen]);

  return (
    <Element name={uid}>
      <button ref={buttonRef} className="link accordion-title" onClick={() => setOpen(!open)}>{button}</button>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={open}
        timeout={timeout + scrollTime}
        classNames="accordion-content"
      >
        <Content offset={offset * 0.2} id={`${id}-accordion-content`}>
          <LockScroll/>
          <div className="border" />
          <div className="accordion-inner">
            {children}
          </div>
          <div className="border" />
        </Content>
      </CSSTransition>
    </Element>
  )
}

Accordion.propTypes = {
  button: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  scrollAfterOpen: PropTypes.bool,
};

Accordion.defaultProps = {
  scrollAfterOpen: false,
};

export default Accordion;
