import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from 'uuid';
import useWindowSize from "../../hooks/useWindowSize";
import WorkItem from "../organisms/WorkItem";
import WorkItemContent from "../molecules/WorkItemContent";

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
    padding: 1rem 0;
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

function Accordion({parentUid, parentButtonHeight, parent}) {
  const [open, setOpen] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const itemUid = uuidv4();
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
      // Stop work content holder from scrolling
      parent.current.style.overflow = "hidden";
      // Scroll the work content holder to show only the title of the open item
      scroller.scrollTo(itemUid, {
        duration: 500,
        smooth: true,
        offset: buttonHeight - titleHeight,
        containerId: 'work-content'
      });

    } else {
      // Scroll the body back to see the edge of the large work text
      scroller.scrollTo(parentUid, {
        duration: 500,
        smooth: true,
        offset: parentButtonHeight * 0.8,
        delay: timeout
      });
      // Resume scrolling work content holder
      parent.current.style.overflow = "scroll";
    }
  }, [open, parentUid, parentButtonHeight, buttonHeight, titleHeight, itemUid, parent]);

  return (
    <>
      <button id={itemUid} ref={buttonRef} className="link" onClick={() => setOpen(!open)}>
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
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  parentButtonHeight: PropTypes.number.isRequired,
};


export default Accordion;
