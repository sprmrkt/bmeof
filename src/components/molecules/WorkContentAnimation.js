import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import useWindowSize from "../../hooks/useWindowSize";

const timeout = 1000;

const Content = styled.div`
  overflow: hidden;
  height: 0;
  position: relative;
  @media( ${props => props.theme.breakpoints.md} ) {
    grid-column: span 2;
  }

  .content-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  &.work-content-appear,
  &.work-content-enter {
    height: 0;
  }

  &.work-content-appear-active,
  &.work-content-appear-done,
  &.work-content-enter-active,
  &.work-content-enter-done {
    height: calc(100vh - 60px);
    transition: height ${timeout}ms;
  }

  &.work-content-exit {
    height: calc(100vh - 60px);
  }

  &.work-content-exit-active {
    height: 0;
    transition: height ${timeout}ms;
  }
`;

function WorkContentAnimation({open, children, parent, parentUid, itemUid}) {
  const size = useWindowSize();
  const tileHeight = size.height - 60;
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (open) {
      // Scroll the body up to hide the parent button
      scroller.scrollTo(parentUid, {
        duration: 500,
        smooth: true,
      });
      // Stop work content holder from scrolling
      parent.current.style.overflow = "hidden";
      // Scroll the work content holder to show only the title of the open item
      scroller.scrollTo(itemUid, {
        duration: timeout,
        smooth: true,
        offset: tileHeight - 60,
        containerId: 'work-content'
      });

      // Update hasOpened
      setHasOpened(true);

    } else if (hasOpened) {
      // Scroll the body back to see the edge of the large work text
      scroller.scrollTo(parentUid, {
        duration: 500,
        smooth: true,
        offset: -60,
        delay: timeout
      });
      // Resume scrolling work content holder
      parent.current.style.overflow = "scroll";
    }
  }, [open, parent, parentUid, tileHeight, itemUid, setHasOpened]);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      in={open}
      timeout={timeout}
      classNames="work-content"
    >
      <Content className="work-content">
        <div className="spacer" />
        <div className="content-inner">
          {children}
        </div>
      </Content>
    </CSSTransition>
  )
}

WorkContentAnimation.propTypes = {
  itemUid: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  open: PropTypes.bool,
};


export default WorkContentAnimation;
