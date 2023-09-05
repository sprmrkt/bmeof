import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkSlides from "./WorkSlides";
import { useSwipeable } from "react-swipeable";
import StackedImages from "./StackedImages";
import NavHolder from "../atoms/NavHolder";
import { Link } from "gatsby";

const Holder = styled.div`
  height: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;

  .close-copyright {
    padding-bottom: 15px;
    @media (${(props) => props.theme.breakpoints.md}) {
      padding-bottom: 0;
    }
  }

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

const Button = styled.button.attrs((props) => ({
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
  @media (${(props) => props.theme.breakpoints.md}) {
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
  display: none;
  @media (${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: calc(100vh - 48px);
    min-height: calc(((100vw - 48px) * 0.75 * 0.6667) + 48px + 48px);
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
    @media (${(props) => props.theme.breakpoints.md}) {
      display: none;
    }
  }
`;

function WorkGallery({
  closeHandler,
  slides,
  currentSlide,
  setCurrentSlide,
  extra,
  project,
}) {
  const [isNext, setIsNext] = useState(true);

  const handlePrev = (current) => {
    setIsNext(false);
    if (current === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(current - 1);
    }
  };
  const handleNext = (current) => {
    setIsNext(true);
    if (current === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(current + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(currentSlide),
    onSwipedRight: () => handlePrev(currentSlide),
  });

  return (
    <Holder className="work-gallery">
      <NavHolder>
        {project && <button onClick={() => closeHandler()}>Back</button>}
        {extra && <Link to="/">Back</Link>}
      </NavHolder>

      <Gallery {...swipeHandlers}>
        <GalleryInner>
          <div className="inner-for-hiding-overflow">
            <WorkSlides
              slides={slides}
              currentSlide={currentSlide}
              isNext={isNext}
            />
          </div>
          {slides.length > 1 && <p className="swipe-text">&larr; &rarr;</p>}
          <Button
            className="prev"
            onClick={() => handlePrev(currentSlide)}
            disabled={slides.length <= 1}
          />
          <Button
            className="next"
            onClick={() => handleNext(currentSlide)}
            disabled={slides.length <= 1}
          />
        </GalleryInner>
      </Gallery>
      <StackedImages slides={slides} />
    </Holder>
  );
}

WorkGallery.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  closeParentHandler: PropTypes.func,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  extra: PropTypes.bool,
  project: PropTypes.bool,
};

export default WorkGallery;

