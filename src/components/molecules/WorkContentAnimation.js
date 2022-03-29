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

  .border {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.black};
    transform-origin: top left;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
  }

  &.work-content-appear,
  &.work-content-enter {
    height: 0;
    .border {
      transform: scaleX(0);
    }
  }

  &.work-content-appear-active,
  &.work-content-appear-done,
  &.work-content-enter-active,
  &.work-content-enter-done {
    height: calc(100vh - 48px);
    transition: height ${timeout}ms;
    .border {
      transform: scaleX(1);
      transition: transform ${timeout}ms;
    }
  }

  &.work-content-exit {
    height: calc(100vh - 48px);
    .border {
      transform: scaleX(1);
    }
  }

  &.work-content-exit-active {
    height: 0;
    transition: height ${timeout}ms;
    .border {
      transform: scaleX(0);
      transition: transform ${timeout}ms;
    }
  }
`;

function WorkContentAnimation({open, children, parent, parentUid, itemUid}) {
  const size = useWindowSize();
  const tileHeight = size.height - 48;
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (open) {
      // Stop work content holder from scrolling
      parent.current.style.overflow = "hidden";
      // Scroll the work content holder to show only the title of the open item
      scroller.scrollTo(itemUid, {
        duration: timeout,
        smooth: true,
        offset: tileHeight - 48,
        containerId: 'work-content'
      });

      // Update hasOpened
      setHasOpened(true);

    } else if (hasOpened) {
      // // Scroll the body back to see the edge of the large work text
      // scroller.scrollTo(parentUid, {
      //   duration: 500,
      //   smooth: true,
      //   offset: -60,
      //   delay: timeout
      // });
      // Resume scrolling work content holder
      parent.current.style.overflow = "scroll";
      // Scroll the work content holder to show only the work tile that was just closed
      scroller.scrollTo(itemUid, {
        duration: 500,
        smooth: true,
        containerId: 'work-content',
        delay: timeout
      });
    }
  }, [open, parent, parentUid, tileHeight, itemUid, hasOpened, setHasOpened]);

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
        <div className="border" />
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
