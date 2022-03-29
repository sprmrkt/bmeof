import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import useWindowSize from "../../hooks/useWindowSize";
import {useMouseHovered} from "react-use";

const Holder = styled.div`
  height: 100%;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;
  @supports (-moz-appearance: none) {
    /*
      Disable in FF due to https://bugzilla.mozilla.org/show_bug.cgi?id=1744289
      using @supports https://stackoverflow.com/a/32455002
    */
    scroll-snap-type: none;
  }

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;

const FixedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
  
  button {
    width: 25%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0;

    &.next {
      left: 75%;
    }

    &:disabled {
      cursor: auto;
    }
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
  scroll-snap-align: start;
  border-bottom: 1px solid;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 24px 24px 0;
    height: calc(100vh - 48px);
    overflow: hidden;
    display: flex;
  }
`;

const ImageHolder = styled.div`
  padding-top: 24px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 0 0 0 24px;
  }
`;

const CloseHolder = styled.div`
  scroll-snap-align: start;
  width: 100%;
  overflow: hidden;

  button {
    font-size: 33.5vw;
    line-height: 0.75;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    display: block;
    padding-top: 24px;
    @supports (-moz-appearance:none) {
      span {
        display: block;
        transform: translateY(10%);
      }
    }
  }
`;

function WorkGallery({closeHandler, closeParentHandler, images, itemUid, currentSlide, setCurrentSlide}) {
  const size = useWindowSize();
  const [mouseText, setMouseText] = useState('');
  const ref = useRef(null);
  const {elX, elY, elW} = useMouseHovered(ref, {bound: false, whenHovered: true});

  const handleClose = () => {
    setTimeout(() => {
      closeParentHandler()
    }, 1500);
    closeHandler(false);
  }

  useEffect(() => {
    if (elX < elW * 0.25 && currentSlide > 0) {
      setMouseText('Prev');
    } else if (elX > elW * 0.75) {
      setMouseText('Next');
    } else {
      setMouseText(`${currentSlide + 1}/${images.length}`);
    }
  }, [elX, elY, elW, images.length, currentSlide]);

  return (
    <Holder id={`${itemUid}-gallery-holder`}>
      <Inner id={`${itemUid}-gallery-inner`}>
        {images.map((image, i) =>
          <ImageHolder key={i} id={`${itemUid}-gallery-image-${i}`}>
            {size.width < 576 && <Image imgName={image} />}
            {size.width >= 576 && <Image imgName={image} height="100vh - 60px - 2rem" />}
          </ImageHolder>
        )}
      </Inner>
      <FixedOverlay ref={ref}>
        <MouseText x={elX} y={elY} className="mouse-text">{mouseText}</MouseText>
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
      </FixedOverlay>
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