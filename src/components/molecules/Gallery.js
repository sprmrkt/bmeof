import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkSlides from "./WorkSlides";
import { useSwipeable } from "react-swipeable";
import StackedImages from "./StackedImages";

const Holder = styled.div`
  position: relative;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  pointer-events: ${({ active }) => (active ? "auto" : "none")};

  &.absPositioned {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
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

const Slides = styled.div`
  display: none;

  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  @media (${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    overflow: hidden;
    position: relative;
    top: 48px;
    height: calc(100vh - 48px);
    min-height: calc(((100vw - 48px) * 0.75 * 0.6667) + 48px + 48px);
    padding: 24px;
    padding-top: 24px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 24px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const SlidesInner = styled.div`
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

const TitleBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  z-index: 10;

  display: flex;
  justify-content: end;
  align-items: center;

  padding: 0 24px;

  border-bottom: 1px solid black;

  will-change: opacity;
  p {
    margin: 0;
  }
`;

function Gallery({
  active,
  slides,
  currentSlide,
  setCurrentSlide,
  absolute,
  closeHandler,
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
    <Holder
      active={active}
      className={`work-gallery ${absolute ? "absPositioned" : ""}`}>
      <TitleBar>
        <button onClick={() => closeHandler()}>Back</button>
      </TitleBar>

      <Slides active={active} {...swipeHandlers}>
        <SlidesInner>
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
        </SlidesInner>
      </Slides>
      <StackedImages slides={slides} />
    </Holder>
  );
}

Gallery.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  absolute: PropTypes.bool,
};

Gallery.defaultProps = {
  absolute: false,
};

export default Gallery;

