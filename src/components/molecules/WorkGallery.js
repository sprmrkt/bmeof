import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import {scroller} from "react-scroll";
import useWindowSize from "../../hooks/useWindowSize";

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
  padding: 1rem;
  background-color: hotpink;
  position: relative;
  @media( ${props => props.theme.breakpoints.md} ) {
    height: calc(100vh - 60px);
    overflow: hidden;
    display: flex;
  }
`;

const ImageHolder = styled.div`
  margin: 0 0 1rem 0;
  @media( ${props => props.theme.breakpoints.md} ) {
    margin: 0 1rem 0 0;
  }
`;

const CloseHolder = styled.div`
  width: 100%;
  overflow: hidden;
`;

function WorkGallery({closeHandler, closeParentHandler, images, itemUid, currentSlide, setCurrentSlide}) {
  const size = useWindowSize();

  const handleClose = () => {
    closeHandler();
    setTimeout(() => {
      closeParentHandler()
    }, 1500);
  }

  return (
    <Holder id={`${itemUid}-gallery-holder`}>
      <Inner id={`${itemUid}-gallery-inner`}>
        {images.map((image, i) =>
          <ImageHolder key={i} id={`${itemUid}-gallery-image-${i}`}>
            {size.width < 576 && <Image imgName={image} />}
            {size.width >= 576 && <Image imgName={image} height='100vh - 60px - 2rem' />}
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