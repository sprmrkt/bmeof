import React from 'react';
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";
import {manualKerning} from "../../utils/helpers";
import {Element, scroller} from "react-scroll";
import {useStore} from "../../utils/store";
import styled from "styled-components";

const Holder = styled.h1`
  cursor: none;
  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
    }
  }
`;

function HeadingOne() {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const clickHandler = () => {
    scroller.scrollTo('heading-one-end', {
      duration: 500,
      smooth: true,
      ignoreCancelEvents: true,
      containerId: 'fixed-body',
    });
  }
  return (
    <Holder
      onMouseEnter={() => setCustomCursorIsVisible(true)}
      onMouseLeave={() => setCustomCursorIsVisible(false)}
      onClick={() => clickHandler()}>
        <span className={`large-text-outer ${useHorizontalHoverClassname()}`}>
          <span className="large-text-wrapper">{manualKerning('Bear meets eagle on fire')}</span>
        </span>
      <Element name="heading-one-end"></Element>
    </Holder>
  )
}

export default HeadingOne;