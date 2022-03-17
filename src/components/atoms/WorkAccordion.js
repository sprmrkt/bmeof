import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Element, scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from 'uuid';
import useWindowSize from "../../hooks/useWindowSize";
import WorkItem from "../organisms/WorkItem";
import WorkItemContent from "../molecules/WorkItemContent";
import WorkContent from "../organisms/WorkContent";

const timeout = 3000;

const Content = styled.div`
  overflow: hidden;
  grid-column: span 2;
  height: 0;
  position: relative;

  .content-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hotpink;
  }

  &.work-content-appear,
  &.work-content-enter {
    height: 0;
  }

  &.work-content-appear-active,
  &.work-content-appear-done,
  &.work-content-enter-active,
  &.work-content-enter-done {
    height: calc(100vh - ${props => props.titleHeight}px);
    transition: height ${timeout}ms;
  }

  &.work-content-exit {
    height: calc(100vh - ${props => props.titleHeight}px);
  }

  &.work-content-exit-active {
    height: 0;
    transition: height ${timeout}ms;
  }
`;

function Accordion({parentUid, parentButtonHeight}) {
  const [open, setOpen] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const uid = uuidv4();
  const buttonRef = useRef(null);
  const titleRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight);
    }
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight);
    }
  }, [size.width]);

  useEffect(() => {
    if (open) {
      // Scroll the body up to hide the parent button
      scroller.scrollTo(parentUid, {
        duration: 500,
        smooth: true,
        offset: parentButtonHeight,
      });

    }
  }, [open, parentUid, parentButtonHeight]);

  return (
    <>
      <button ref={buttonRef} className="link" onClick={() => setOpen(!open)}>
        <WorkItem ref={titleRef} />
      </button>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={open}
        timeout={timeout}
        classNames="work-content"
      >
        <Content className="work-content" titleHeight={titleHeight} buttonHeight={buttonHeight}>
          <div className="spacer" />
          <div className="content-inner">
            <WorkItemContent />
          </div>
        </Content>
      </CSSTransition>
    </>
  )
}

Accordion.propTypes = {
  parentUid: PropTypes.string.isRequired,
  parentButtonHeight: PropTypes.number.isRequired,
};


export default Accordion;
