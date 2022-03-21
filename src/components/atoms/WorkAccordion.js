import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {scroller} from 'react-scroll/modules';
import {CSSTransition} from "react-transition-group";
import {v4 as uuidv4} from 'uuid';
import useWindowSize from "../../hooks/useWindowSize";
import WorkTile from "../organisms/WorkTile";
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
    padding: 0 0 1rem 0;
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

function WorkAccordion({parentUid, parentButtonHeight, parent, even}) {
  const [open, setOpen] = useState(false);
  const itemUid = uuidv4();
  const size = useWindowSize();
  const tileHeight = size.height - 60;

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
        offset: tileHeight - 60,
        containerId: 'work-content'
      });

    } else {
      // Scroll the body back to see the edge of the large work text
      scroller.scrollTo(parentUid, {
        duration: 500,
        smooth: true,
        offset: parentButtonHeight - 60,
        delay: timeout
      });
      // Resume scrolling work content holder
      parent.current.style.overflow = "scroll";
    }
  }, [open, parentUid, parentButtonHeight, tileHeight, itemUid, parent]);

  return (
    <>
      <div id={itemUid}>
        <WorkTile
          open={open}
          even={even}
          toggleProjectHandler={(toggle) => setOpen(toggle)} />
      </div>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={open}
        timeout={timeout}
        classNames="work-content"
      >
        <Content className="work-content" tileHeight={tileHeight}>
          <div className="spacer" />
          <div className="content-inner">
            <WorkItemContent />
          </div>
        </Content>
      </CSSTransition>
    </>
  )
}

WorkAccordion.propTypes = {
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  parentButtonHeight: PropTypes.number.isRequired,
  even: PropTypes.bool,
};

WorkAccordion.defaultProps = {
  even: false,
};


export default WorkAccordion;
