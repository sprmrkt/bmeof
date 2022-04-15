import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {useMouseHovered} from "react-use";
import WorkSlideStandard from "./WorkSlideStandard";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  @supports (-moz-appearance: none) {
    /*
      Disable in FF due to https://bugzilla.mozilla.org/show_bug.cgi?id=1744289
      using @supports https://stackoverflow.com/a/32455002
    */
    scroll-snap-type: none;
  }
  @media( ${props => props.theme.breakpoints.md} ) {
    scroll-snap-type: y mandatory;
  }
  .close-copyright{ padding-bottom: 0; }

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;

const Button = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  position: absolute;
  z-index: 20;
  width: 25%;
  top: 0;
  left: 0;
  bottom: 0;
  display: none;
  @media( ${props => props.theme.breakpoints.md} ) {
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
  transition: transform 100ms ease-out;
  text-transform: uppercase;
  font-size: 40px;
`;

const Inner = styled.div`
  width: 100%;
  padding: 0 15px 15px 15px;
  position: relative;
  border-bottom: 1px solid;
  @media ( ${props => props.theme.breakpoints.md} ) {
    scroll-snap-align: start;
    padding: 24px 24px 24px 0;
    height: calc(100vh - 48px);
    overflow: hidden;
    display: flex;
  }
`;

const SlideHolder = styled.div`
  padding-top: 15px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 0 0 0 24px;
  }
`;

function WorkGallery({closeHandler, closeParentHandler, slides, itemUid, currentSlide, setCurrentSlide}) {
  const prevRef = useRef(null);
  const prevMouseHovered = useMouseHovered(prevRef, {bound: false, whenHovered: true});
  const nextRef = useRef(null);
  const nextMouseHovered = useMouseHovered(nextRef, {bound: false, whenHovered: true});

  const handleClose = () => {
    setTimeout(() => {
      closeParentHandler()
    }, 1500);
    closeHandler(false);
  }

  const handlePrev = (current) => {
    if( current === 0 ) {
      setCurrentSlide(slides.length - 1)
    } else {
      setCurrentSlide(current - 1)
    }
  }
  const handleNext = (current) => {
    if( current === slides.length - 1 ) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(current + 1)
    }
  }

  return (
    <Holder id={`${itemUid}-gallery-holder`}>
      <Inner id={`${itemUid}-gallery-inner`}>
        {slides.map((slide, i) =>
          <SlideHolder key={i} id={`${itemUid}-gallery-image-${i}`}>
            {slide.slice_type === 'standard_slide' && <WorkSlideStandard slide={slide}/>}
          </SlideHolder>
        )}
      </Inner>
      <Button
        ref={prevRef}
        className="prev"
        onClick={() => handlePrev(currentSlide)}>
        <MouseText x={prevMouseHovered.elX} y={prevMouseHovered.elY} className="mouse-text">Prev</MouseText>
      </Button>
      <Button
        ref={nextRef}
        className="next"
        onClick={() => handleNext(currentSlide)}>
        <MouseText x={nextMouseHovered.elX} y={nextMouseHovered.elY} className="mouse-text">Next</MouseText>
      </Button>
      <CloseButton closeHandler={handleClose} border={false}/>
    </Holder>
  )
}

WorkGallery.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  closeParentHandler: PropTypes.func.isRequired,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  itemUid: PropTypes.string.isRequired,
};

export default WorkGallery;