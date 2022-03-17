import React from 'react';
import styled from 'styled-components';

const Holder = styled.div`
  height: 100%;
  position: relative;
  background-color: hotpink;
  padding: 1rem;
  > :first-child { margin-top: 0; }
  > :last-child { margin-bottom: 0; }
`;

function WorkItemContent() {
  return (
    <Holder>
      <p>The gallery</p>
    </Holder>
  )
}

export default WorkItemContent;