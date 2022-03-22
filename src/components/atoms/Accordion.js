import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Element, scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from 'uuid';
import LockScroll from "./LockScroll";

const scrollTime = 500;
const timeout = 2000;


const Button = styled.button`
  ${(props) => props.theme.largeType()};
  line-height: 0.8;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  display: block;
  @supports (-moz-appearance:none) {
    span {
      display: block;
      transform: translateY(0.1em);
    }
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
    z-index: 2;
    top: 0;
    left: 0;

    &:last-child {
      top: auto;
      bottom: -1px;
    }
  }
  
  .close-button {
    ${(props) => props.theme.largeType()};
    line-height: 0.8;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    display: block;
    @supports (-moz-appearance:none) {
      span {
        display: block;
        transform: translateY(10%);
      }
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
      height: 100vh;
      transition: height ${timeout * 0.75}ms ${timeout * 0.25}ms;
    }

    .border {
      transform: scaleX(1);
      transition: transform ${timeout * 0.25}ms;
    }
  }

  &.accordion-content-exit {
    .accordion-inner {
      height: 100vh;
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

function Accordion({button, children, id}) {
  const [open, setOpen] = useState(false);
  const uid = uuidv4();

  useEffect(() => {
    if (open) {
      scroller.scrollTo(uid, {
        duration: scrollTime,
        smooth: true,
        offset: -60,
        delay: timeout
      });
    }
  }, [open, uid]);

  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        parentUid: uid,
        closeHandler: () => setOpen(false),
      });
    }
    return child;
  });

  return (
    <>
      <Button className="accordion-title" onClick={() => setOpen(!open)}><span>{button}</span></Button>
      <Element name={uid}/>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={open}
        timeout={timeout}
        classNames="accordion-content"
      >
        <Content id={`${id}-accordion-content`}>
          <LockScroll/>
          <div className="border" />
          <div className="accordion-inner">
            {childrenWithProps}
          </div>
          <div className="border" />
        </Content>
      </CSSTransition>
    </>
  )
}

Accordion.propTypes = {
  button: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Accordion;
