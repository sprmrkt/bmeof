import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {useMouseHovered} from "react-use";
import {convertToSlug} from "../../utils/helpers";
import {v4 as uuidv4} from "uuid";
import MediaItem from "./MediaItem";
import {scroller} from "react-scroll";
import useWindowSize from "../../hooks/useWindowSize";

const Holder = styled.div`
  height: calc(100% - 48px);
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

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
  transition: transform 100ms ease-out;
  text-transform: uppercase;
  font-size: 40px;
`;

const Inner = styled.div`
  width: 100%;
  padding: 0 24px 24px 24px;
  position: relative;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 24px 24px 0;
    height: calc(100vh - 48px);
    overflow: hidden;
    display: flex;
  }
`;

const SlideHolder = styled.div`
  padding-top: 24px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 0 0 0 24px;
  }
  .gatsby-image-wrapper {
    max-width: calc(100vw - 48px);
    @media( max-width: 767px ) {
      width: 100% !important;
      height: auto !important;
      max-width: none;
    }
  }
  video, img {
    width: 100%;
    height: auto;
    @media( ${props => props.theme.breakpoints.md} ) {
      height: calc(100vh - 48px - 48px);
      width: auto;
      max-width: calc(100vw - 48px);
      object-fit: cover;
      object-position: center;
    }
  }
`;

function PostGallery({slides, title}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const size = useWindowSize();
  const itemUid = convertToSlug(title.text) + '-' + uuidv4();
  const prevRef = useRef(null);
  const prevMouseHovered = useMouseHovered(prevRef, {bound: false, whenHovered: true});
  const nextRef = useRef(null);
  const nextMouseHovered = useMouseHovered(nextRef, {bound: false, whenHovered: true});

  useEffect(() => {
    scroller.scrollTo(`${itemUid}-post-gallery-image-${currentSlide}`, {
      duration: 500,
      smooth: true,
      containerId: `${itemUid}-post-gallery-${size.width >= 576 ? 'inner' : 'holder'}`,
      horizontal: size.width >= 576,
      ignoreCancelEvents: true
    });
  }, [currentSlide, size.width, itemUid,]);

  return (
    <Holder id={`${itemUid}-post-gallery-holder`} className="post-gallery-holder">
      <Inner id={`${itemUid}-post-gallery-inner`}>
        {slides.map((slide, i) =>
          <SlideHolder key={i} id={`${itemUid}-post-gallery-image-${i}`}>
            <MediaItem media={slide} height="100vh - 48px - 48px" />
            {/*{slide.slice_type === 'standard_slide' && <WorkSlideStandard slide={slide}/>}*/}
          </SlideHolder>
        )}
      </Inner>
      <Button
        ref={prevRef}
        className="prev"
        onClick={() => setCurrentSlide(currentSlide - 1)}
        disabled={currentSlide === 0}>
        <MouseText x={prevMouseHovered.elX} y={prevMouseHovered.elY} className="mouse-text">Prev</MouseText>
      </Button>
      <Button
        ref={nextRef}
        className="next"
        onClick={() => setCurrentSlide(currentSlide + 1)}
        disabled={currentSlide === slides.length - 1}>
        <MouseText x={nextMouseHovered.elX} y={nextMouseHovered.elY} className="mouse-text">Next</MouseText>
      </Button>
    </Holder>
  )
}

PostGallery.propTypes = {
  slides: PropTypes.array.isRequired,
  title: PropTypes.object.isRequired,
};

export default PostGallery;