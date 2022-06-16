import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Element, scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from 'uuid';
import LockScroll from "./LockScroll";
import {useStore} from "../../utils/store";
import classNames from "classnames";
import AccordionButton from "./AccordionButton";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import {useWindowSize} from "react-use";


const scrollTime = 500;
const timeout = 1000;

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
    z-index: 3;
    top: 0;
    left: 0;
    transition: opacity 0.25s;
    &.project-is-open {
      background-color: ${props => props.theme.colors.white};
    }

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
      opacity: 0;
    }
  }

  &.accordion-content-appear-active,
  &.accordion-content-appear-done,
  &.accordion-content-enter-active,
  &.accordion-content-enter-done {
    .accordion-inner {
      height: var(--windowHeight);
      transition: height ${timeout * 0.75}ms ${timeout * 0.25 + scrollTime}ms;
    }

    .border {
      opacity: 1;
      transition: opacity ${timeout * 0.25}ms ${scrollTime}ms;
    }
  }

  &.accordion-content-exit {
    .accordion-inner {
      height: var(--windowHeight);
    }

    .border {
      opacity: 1;
    }
  }

  &.accordion-content-exit-active {
    .accordion-inner {
      height: 0;
      transition: height ${timeout * 0.75}ms;
    }

    .border {
      opacity: 0;
      transition: opacity ${timeout * 0.25}ms ${timeout * 0.75}ms;
    }
  }
`;

function Accordion({button, children, id, fixedBody}) {
  const [open, setOpen] = useState(false);
  const uid = id + '-' + uuidv4();
  const uid2 = id + '-' + uuidv4();
  const projectIsOpen = useStore(state => state.projectIsOpen);
  const setAccordionIsOpen = useStore(state => state.setAccordionIsOpen);
  const size = useWindowSize();

  // Set scroll on open
  useEffect(() => {
    if (open) {
      // Scroll to accordion button end ( minus 48px )
      scroller.scrollTo(uid, {
        duration: projectIsOpen ? 100 : scrollTime,
        smooth: true,
        offset: projectIsOpen ? 0 : -48,
        ignoreCancelEvents: true,
        containerId: 'fixed-body',
      });
    }
  }, [open, uid, uid2, projectIsOpen]);

  useEffect(() => {
    setOpen(false)
  }, [size]);


  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        parentUid: uid,
        closeHandler: () => {
          setOpen(false)
          setAccordionIsOpen(false)
        },
      });
    }
    return child;
  });

  const borderClasses = classNames('top-border', 'border', { 'project-is-open': projectIsOpen });

  return (
    <>
      <Element name={uid2}/>
      <AccordionButton toggleOpen={() => {
        setOpen(!open)
        setAccordionIsOpen(!open)
      }} text={button} open={open}/>
      <Element name={uid}/>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={open}
        timeout={scrollTime + timeout}
        classNames="accordion-content"
      >
        <Content id={`${id}-accordion-content`}>
          <LockScroll fixedBody={fixedBody}/>
          <div className={borderClasses} />
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
  fixedBody: PropTypes.object,
};

export default Accordion;
