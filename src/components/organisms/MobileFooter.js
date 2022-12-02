import React from 'react';
import styled from 'styled-components';
import HeadingOne from "../molecules/HeadingOne";
import Header from "../molecules/Header";
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
      <HeadingOne footer/>
      <Header/>
      {accordionIsOpen && <AccordionOpenSpacer/>}
    </Holder>
  )
}

export default MobileFooter;