import React from 'react';
import styled from 'styled-components';
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Holder = styled.div`
  width: 0;
  height: 0;
  opacity: 0;
`;

function LockScroll() {
  useLockBodyScroll();
  return (
    <Holder/>
  )
}

export default LockScroll;