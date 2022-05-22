import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import WorkSlides from "./WorkSlides";
import CloseButton from "../atoms/CloseButton";
import {useSwipeable} from "react-swipeable";
import {useStore} from "../../utils/store";

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
  const [isNext, setIsNext] = useState(true);
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const setCustomCursorContent = useStore(state => state.setCustomCursorContent);

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
      setCustomCursorContent(`${slides.length}/${slides.length}`)
    } else {
      setCurrentSlide(current - 1)
      setCustomCursorContent(`${currentSlide}/${slides.length}`)
    }
  }
  const handleNext = (current) => {
    setIsNext(true)
    if (current === slides.length - 1) {
      setCurrentSlide(0)
      setCustomCursorContent(`1/${slides.length}`)
    } else {
      setCurrentSlide(current + 1)
      setCustomCursorContent(`${currentSlide + 2}/${slides.length}`)
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
            className="prev"
            onClick={() => handlePrev(currentSlide)}
            onMouseEnter={() => {
              setCustomCursorIsVisible(true)
              setCustomCursorContent(`${currentSlide === 0 ? slides.length : currentSlide}/${slides.length}`)
            }}
            onMouseLeave={() => {
              setCustomCursorIsVisible(false)
              setCustomCursorContent(false)
            }}
            disabled={slides.length <= 1}/>
          <Button
            className="next"
            onClick={() => handleNext(currentSlide)}
            onMouseEnter={() => {
              setCustomCursorIsVisible(true)
              setCustomCursorContent(`${currentSlide === slides.length -1 ? 1 : currentSlide + 2}/${slides.length}`)
            }}
            onMouseLeave={() => {
              setCustomCursorIsVisible(false)
              setCustomCursorContent(false)
            }}
            disabled={slides.length <= 1}/>
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