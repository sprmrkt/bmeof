import React, {useRef} from 'react';
import styled from 'styled-components';
import WorkAccordion from "../atoms/WorkAccordion";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  padding: 1rem;
  @media ( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
`;

function WorkContent() {
  const holderRef = useRef(null);
  return (
    <Holder ref={holderRef} id="work-content">
      <WorkAccordion parent={holderRef}/>
      <WorkAccordion parent={holderRef}/>
      <WorkAccordion parent={holderRef}/>
      <WorkAccordion parent={holderRef}/>
    </Holder>
  )
}

export default WorkContent;