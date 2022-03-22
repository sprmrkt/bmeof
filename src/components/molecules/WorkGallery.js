import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import WorkList from "../organisms/WorkList";

const Holder = styled.div`
  height: 100%;
  position: relative;
  overflow-y: scroll;

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;

const Inner = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  padding: 1rem;
  background-color: hotpink;

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

const CloseHolder = styled.div`
  width: 100%;
  overflow: hidden;
`;

function WorkGallery({closeHandler}) {
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
      <CloseHolder>
        <button className="close-button" onClick={() => closeHandler()}><span>Close</span></button>
      </CloseHolder>
    </Holder>
  )
}

WorkGallery.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default WorkGallery;