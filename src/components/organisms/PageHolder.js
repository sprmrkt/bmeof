import React from 'react';
import styled from 'styled-components';
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
    height: 100vh;
    height: 100svh;
    overflow: hidden;
`;

const Inner = styled.div`
    height: 100%;
    padding-top: 48px;
    overflow: scroll;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
`;

function PageHolder({children}) {
  return (
    <Holder>
      <Inner>
        {children}
        <CloseButton />
      </Inner>
    </Holder>
  )
}

export default PageHolder;