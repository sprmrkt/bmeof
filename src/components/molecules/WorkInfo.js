import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import WorkInfoMedia from "./WorkInfoMedia";
import PrismicRichText from "../atoms/PrismicRichText";
import {useStore} from "../../utils/store";

const timeout = 1000

const Holder = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 0 15px;
  border-bottom: 1px solid;
  position: relative;
  @media ( ${props => props.theme.breakpoints.sm} ) {
    padding: 0 24px;
  }

  .close-info {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 200;
    @media ( ${props => props.theme.breakpoints.md} ) {
      cursor: none;
    }
  }

  &.work-info-appear,
  &.work-info-enter {
    height: 0;
  }

  &.work-info-appear-active,
  &.work-info-appear-done,
  &.work-info-enter-active,
  &.work-info-enter-done {
    height: calc(100vh - 96px);
    transition: height ${timeout}ms;
  }

  &.work-info-exit {
    height: calc(100vh - 96px);
  }

  &.work-info-exit-active {
    height: 0;
    transition: height ${timeout}ms;
  }
`;

const Images = styled.div`
  display: none;
  @media ( ${props => props.theme.breakpoints.sm} ) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
    padding: 24px 0;
  }

  svg {
    width: 50px !important;
  }
`;

const TextHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  padding-top: 15px;
  @media ( ${props => props.theme.breakpoints.sm} ) {
    padding-top: 24px;
    grid-template-columns: 2fr 1fr 1fr;
  }
  
  p, li {
    font-weight: 100;
  }

  .tags {
    @media ( ${props => props.theme.breakpoints.sm} ) {
      grid-column: 3/4;
    }
    ul {
      list-style: none;
      margin: 0;
      padding-left: 0;
      > :first-child { margin-top: 0; }
      > :last-child { margin-bottom: 0; }
      li {
        color: #808080;
      }
    }
  }
  
  > div {
    > :first-child { margin-top: 0; }
    > :last-child { margin-bottom: 0; }
  }
`;

function WorkInfo({open, slides, closeHandler, setCurrentSlide, infoText, tags}) {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);

  const handleClick = (i) => {
    setTimeout(() => {
      setCurrentSlide(i);
    }, timeout);
    closeHandler();
  }

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      in={open}
      timeout={timeout}
      classNames="work-info"
    >
      <Holder>
        <TextHolder>
          <div className="text">
            <PrismicRichText render={infoText.richText} />
          </div>
          {tags.length > 0 && <div className="tags">
            <ul>
              {tags.map((tag, i) => <li key={i}>{tag}</li>)}
            </ul>
          </div>}
        </TextHolder>
        <Images>
          {slides.map((slide, i) =>
            <WorkInfoMedia
              key={i}
              handleClick={() => handleClick(i)}
              media={slide.primary}
              totalImages={slides.length}
              i={i} />
          )}
        </Images>
        <button
          className="close-info"
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => closeHandler()} title="Close info" />
      </Holder>
    </CSSTransition>
  )
}

WorkInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  infoText: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
  closeHandler: PropTypes.func.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  tags: PropTypes.array,
};

export default WorkInfo;