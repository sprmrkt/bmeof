import React from 'react';
import styled from 'styled-components';
import {useStore} from "../../utils/store";

const Holder = styled.div`
  @media( ${props => props.theme.breakpoints.md} ) {
    display: none;
  }
`;

const AccordionOpenSpacer = styled.div`
  height: 100vh;
`;

function MobileFooter() {
  const accordionIsOpen = useStore(state => state.accordionIsOpen);
  return (
    <Holder>
      {accordionIsOpen && <AccordionOpenSpacer/>}
    </Holder>
  )
}

export default MobileFooter;