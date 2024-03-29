import React from 'react';
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";
import {manualKerning} from "../../utils/helpers";
import {Element, scroller} from "react-scroll";
import {useStore} from "../../utils/store";
import styled from "styled-components";
import PropTypes from "prop-types";

const Holder = styled.h1`
  cursor: none;
  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
    }
  }

  .manual-kerning:hover {
    @media ( ${props => props.theme.breakpoints.md} ) {
      color: rgb(70, 70, 70);
    }
  }
`;

function HeadingOne({footer}) {
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
      {!footer && <Element name="heading-one-end"></Element>}
    </Holder>
  )
}

HeadingOne.propTypes = {
  footer: PropTypes.bool,
};

export default HeadingOne;