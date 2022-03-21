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

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  padding: 1rem;

  div {
    position: relative;
    width: 50rem;
    flex-shrink: 0;
    height: 100%;
    margin-right: 1rem;
    background-color: black;

    &:last-child {
      margin-right: 0;
    }
  }
`;

function WorkGallery() {
  return (
    <Holder>
      <Inner>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </Inner>
    </Holder>
  )
}

export default WorkGallery;