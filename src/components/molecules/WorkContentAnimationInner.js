import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {scroller} from 'react-scroll/modules';
import useWindowSize from "../../hooks/useWindowSize";

const timeout = 1000;

const Content = styled.div`
  overflow: hidden;
  height: 0;
  position: relative;
  @media ( ${props => props.theme.breakpoints.md} ) {
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
  const offsetHeight = size.width < 768 ? size.width - 24 : size.height - 96;

  useEffect(() => {
    if (open) {
      // Stop work content holder from scrolling
      parent.current.style.overflow = "hidden";
      parent.current.style.scrollSnapType = "none";
      // Scroll the work content holder to show only the title of the open item
      scroller.scrollTo(itemUid, {
        duration: timeout,
        smooth: true,
        offset: offsetHeight,
        containerId: 'work-content',
        ignoreCancelEvents: true
      });

    } else {
      // Resume scrolling work content holder
      parent.current.style.overflow = "scroll";

      // Scroll the work content holder to show only the work tile that was just closed
      scroller.scrollTo(itemUid, {
        duration: 500,
        smooth: true,
        containerId: 'work-content',
        delay: timeout,
        ignoreCancelEvents: true,
      });

    }
  }, [open, parent, parentUid, offsetHeight, itemUid]);

  return (
    <Content className="work-content">
      <div className="border" />
      <div className="content-inner">
        {children}
      </div>
    </Content>
  )
}

WorkContentAnimation.propTypes = {
  itemUid: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  open: PropTypes.bool,
};


export default WorkContentAnimation;
