import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {scroller} from 'react-scroll/modules';
import useWindowSize from "../../hooks/useWindowSize";
import {useStore} from "../../utils/store";

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

  &.work-content-appear,
  &.work-content-enter {
    height: 0;
  }

  &.work-content-appear-active,
  &.work-content-appear-done,
  &.work-content-enter-active,
  &.work-content-enter-done {
    height: calc(100vh - 48px + 1px); // Plus 1px to hide the border on the top of the close button
    transition: height ${timeout}ms;
  }

  &.work-content-exit {
    height: calc(100vh - 48px + 1px); // Plus 1px to hide the border on the top of the close button
  }

  &.work-content-exit-active {
    height: 0;
    transition: height ${timeout}ms;
  }
`;

function WorkContentAnimation({open, children, parent, parentUid, itemUid, tileHeight}) {
  const embedIsOpen = useStore(state => state.embedIsOpen)
  const offsetHeight = tileHeight - 48;

  useEffect(() => {
    if (open) {
      // Stop work content holder from scrolling
      parent.current.style.overflow = "hidden";
      parent.current.style.scrollSnapType = "none";
      // Scroll the work content holder to show only the title of the open item
      scroller.scrollTo(itemUid, {
        duration: timeout,
        smooth: true,
        offset: embedIsOpen ? offsetHeight + 48 : offsetHeight,
        containerId: 'work-content',
        ignoreCancelEvents: true
      });

    } else {
      // Resume scrolling work content holder
      // scrollSnapType (see above where we set it to none) gets reset out in the
      // WorkContentAnimation component in the onExited callback in the css transition component.
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
  }, [open, parent, parentUid, offsetHeight, itemUid, embedIsOpen]);

  return (
    <Content className="work-content">
      <div className="content-inner">
        {children}
      </div>
    </Content>
  )
}

WorkContentAnimation.propTypes = {
  itemUid: PropTypes.string.isRequired,
  tileHeight: PropTypes.number,
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  open: PropTypes.bool,
};


export default WorkContentAnimation;
