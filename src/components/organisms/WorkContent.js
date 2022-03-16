import React from 'react';
import styled from 'styled-components';
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import WorkItem from "./WorkItem";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  @media ( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
  }
`;

function WorkContent() {
  return (
    <Holder>
      <WorkItem/>
    </Holder>
  )
}

export default WorkContent;