import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useStore} from "../../utils/store";

const Holder = styled.div`
  width: 100%;
  height: var(--windowHeight);
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: none;
  }
`;

// A spacer to make the accordion open on mobile smooth
function MobileAccordionOpenEndSpace() {
  const accordionIsOpen = useStore(state => state.accordionIsOpen);
  const [ show, setShow ] = useState( false );

  useEffect(() => {
    if(accordionIsOpen) {
      setShow(true)
    } else {
      const hideTimeout = setTimeout(() => setShow(false), 1500);
    }
  }, [accordionIsOpen, setShow]);


  if ( !show ) return null;
  return (
    <Holder/>
  )
}

export default MobileAccordionOpenEndSpace;