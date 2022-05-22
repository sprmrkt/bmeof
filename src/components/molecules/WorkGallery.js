import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {useMouseHovered} from "react-use";
import WorkSlides from "./WorkSlides";
import CloseButton from "../atoms/CloseButton";
import {useSwipeable} from "react-swipeable";

const Holder = styled.div`
  height: 100%;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .close-copyright { padding-bottom: 0; }

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;

const Button = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  position: absolute;
  z-index: 20;
  width: 25%;
  height: 0;
  padding-bottom: calc(25% / 3 * 2 * 4);
  top: 0;
  left: 0;
  display: none;
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: block;
  }

  .mouse-text {
    opacity: 0;
  }

  &:hover {
    .mouse-text {
      opacity: 1;
    }
  }

  &.next {
    left: 75%;
  }

  &:disabled {
    display: none;
  }
`;

const MouseText = styled.div.attrs(props => ({
  style: {
    transform: `translate( ${props.x}px, ${props.y - 20}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  color: #ffff00;
  pointer-events: none;
  transition: transform 100ms ease-out, opacity 10ms 100ms linear;
  text-transform: uppercase;
  font-size: 40px;
`;

const Gallery = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  overflow: hidden;
  padding: 15px;
  position: relative;
  border-bottom: 1px solid;
  scroll-snap-align: start;
  @media ( ${props => props.theme.breakpoints.md} ) {
    height: calc(100vh - 48px + 1px);
    padding: 24px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 24px;
  }
`;

const GalleryInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .inner-for-hiding-overflow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  
  .swipe-text {
    position: absolute;
    top: 100%;
    left: 0;
    text-transform: uppercase;
    @media( ${props => props.theme.breakpoints.md} ) {
      display: none;
    }
  }
`;

function WorkGallery({closeHandler, closeParentHandler, slides, currentSlide, setCurrentSlide}) {
  const prevRef = useRef(null);
  const prevMouseHovered = useMouseHovered(prevRef, {bound: false, whenHovered: true});
  const nextRef = useRef(null);
  const nextMouseHovered = useMouseHovered(nextRef, {bound: false, whenHovered: true});
  const [isNext, setIsNext] = useState(true);

  const handleClose = () => {
    if(closeParentHandler) {
      setTimeout(() => {
        closeParentHandler()
      }, 1500);
    }
    closeHandler(false);
  }

  const handlePrev = (current) => {
    setIsNext(false)
    if (current === 0) {
      setCurrentSlide(slides.length - 1)
    } else {
      setCurrentSlide(current - 1)
    }
  }
  const handleNext = (current) => {
    setIsNext(true)
    if (current === slides.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(current + 1)
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(currentSlide),
    onSwipedRight: () => handlePrev(currentSlide),
  });

  return (
    <Holder>
      <Gallery {...swipeHandlers}>
        <GalleryInner>
          <div className="inner-for-hiding-overflow">
            <WorkSlides slides={slides} currentSlide={currentSlide} isNext={isNext}/>
          </div>
          {slides.length > 1 && <p className="swipe-text">&larr; &rarr;</p>}
          <Button
            ref={prevRef}
            className="prev"
            onClick={() => handlePrev(currentSlide)}
            disabled={slides.length <= 1}>
            <MouseText x={prevMouseHovered.elX} y={prevMouseHovered.elY} className="mouse-text">Prev</MouseText>
          </Button>
          <Button
            ref={nextRef}
            className="next"
            onClick={() => handleNext(currentSlide)}
            disabled={slides.length <= 1}>
            <MouseText x={nextMouseHovered.elX} y={nextMouseHovered.elY} className="mouse-text">Next</MouseText>
          </Button>
        </GalleryInner>
      </Gallery>
      <CloseButton closeHandler={handleClose} border={false} />
    </Holder>
  )
}

WorkGallery.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  closeParentHandler: PropTypes.func,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
};

export default WorkGallery;