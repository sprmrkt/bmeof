import React from 'react';
import styled from 'styled-components';

const Holder = styled.div`
  height: 100%;
  position: relative;
`;

function WorkItemContent() {
  return (
    <Holder>
      <p>The gallery</p>
    </Holder>
  )
}

export default WorkItemContent;