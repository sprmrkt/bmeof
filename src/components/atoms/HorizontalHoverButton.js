import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {useStore} from "../../utils/store";
import classNames from "classnames";
import {useMouse} from "react-use";

const Holder = styled.div`
  display: none;
  @media ( ${props => props.theme.breakpoints.md} ) {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }
`;

function HorizontalHoverButton() {
  const ref = useRef(null)
  const {elX, elW} = useMouse(ref);
  const setHorizontalHover = useStore(state => state.setHorizontalHover);
  const accordionIsOpen = useStore(state => state.accordionIsOpen);
  const horizontalHoverDistance = useStore(state => state.horizontalHoverDistance);

  useEffect(() => {
    document.documentElement.style.setProperty('--horizontalHoverDistance', `${horizontalHoverDistance}px`);
  }, [horizontalHoverDistance]);

  useEffect(() => {
    // console.log(elX, elW, elW-elX < 60)
    if(elW-elX !== 0 && elW-elX < 60 && !accordionIsOpen) {
      // console.log( 'in' )
      setHorizontalHover(true)
    } else {
      // console.log( 'out' )
      setHorizontalHover(false)
    }
  }, [ elX, elW ]);


  return (
    <Holder
      ref={ref}
    />
  )
}

export default HorizontalHoverButton;