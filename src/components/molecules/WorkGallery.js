import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import {scroller} from "react-scroll";

const Holder = styled.div`
  height: 100%;
  position: relative;
  overflow-y: scroll;

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;

const ButtonHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    position: absolute;
    z-index: 20;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: yellow;
    opacity: 0;

    &:hover {
      opacity: 1;
    }

    &.next {
      left: auto;
      right: 0;
    }

    &:disabled {
      opacity: 0;
    }
  }
`;

const Inner = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;
  padding: 1rem;
  background-color: hotpink;
  position: relative;
`;

const ImageHolder = styled.div`
  margin: 0 1rem 0 0;
`;

const CloseHolder = styled.div`
  width: 100%;
  overflow: hidden;
`;

function WorkGallery({closeHandler, closeParentHandler, images, itemUid, currentSlide, setCurrentSlide}) {

  const handleClose = () => {
    closeHandler();
    setTimeout(() => {
      closeParentHandler()
    }, 1500);
  }

  return (
    <Holder>
      <Inner id={`${itemUid}-gallery-holder`}>
        {images.map((image, i) =>
          <ImageHolder key={i} id={`${itemUid}-gallery-image-${i}`}>
            <Image imgName={image} height="100vh - 60px - 2rem" />
          </ImageHolder>
        )}
      </Inner>
      <ButtonHolder>
        <button
          className="next"
          onClick={() => setCurrentSlide(currentSlide + 1)}
          disabled={currentSlide === images.length - 1}>Next
        </button>
        <button
          className="prev"
          onClick={() => setCurrentSlide(currentSlide - 1)}
          disabled={currentSlide === 0}>Prev
        </button>
      </ButtonHolder>
      <CloseHolder>
        <button className="close-button" onClick={() => handleClose()}><span>Close</span></button>
      </CloseHolder>
    </Holder>
  )
}

WorkGallery.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  closeParentHandler: PropTypes.func.isRequired,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  itemUid: PropTypes.string.isRequired,
};

export default WorkGallery;