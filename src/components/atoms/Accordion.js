import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import {animateScroll as scroll} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";

const timeout = 3000;

const Holder = styled.div`
  button {
    margin: 0.5rem 0;
  }
`;

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
      height: calc(100vh - 4rem);
      transition: height ${timeout * 0.75}ms ${timeout * 0.25}ms;
    }
    .border {
      transform: scaleX(1);
      transition: transform ${timeout * 0.25}ms;
    }
  }
  &.accordion-content-exit {
    .accordion-inner {
      height: calc(100vh - 4rem);
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

function Accordion({title, children}) {
  const [open, setOpen] = useState(false);

  return (
    <Holder>
      <button className="link accordion-title" onClick={() => setOpen(!open)}>{title}</button>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={open}
        timeout={timeout}
        classNames="accordion-content"
      >
        <Content>
          <div className="border" />
          <div className="accordion-inner">
            {children}
          </div>
          <div className="border" />
        </Content>
      </CSSTransition>
    </Holder>
  )
}

Accordion.propTypes = {
  title: PropTypes.element.isRequired,
};

export default Accordion;
