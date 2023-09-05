import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkInfoMedia from "./WorkInfoMedia";
import { PrismicRichText } from "@prismicio/react";

const Holder = styled.div`
  -webkit-overflow-scrolling: touch;
  padding: 0 15px;
  border-bottom: 1px solid;
  position: relative;
  height: calc(100vh - 48px);

  @media (${(props) => props.theme.breakpoints.sm}) {
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
    @media (${(props) => props.theme.breakpoints.md}) {
      cursor: none;
    }
  }
`;

const Images = styled.div`
  display: none;
  @media (${(props) => props.theme.breakpoints.sm}) {
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
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding-top: 24px;
    grid-template-columns: 2fr 1fr 1fr;
  }

  p,
  li {
    font-weight: 100;
  }

  .tags {
    @media (${(props) => props.theme.breakpoints.sm}) {
      grid-column: 3/4;
    }
    ul {
      list-style: none;
      margin: 0;
      padding-left: 0;
      > :first-child {
        margin-top: 0;
      }
      > :last-child {
        margin-bottom: 0;
      }
      li {
        color: #808080;
      }
    }
  }

  > div {
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
`;

function WorkInfo({ slides, closeHandler, setCurrentSlide, infoText }) {
  const handleClick = (i) => {
    setTimeout(() => {
      setCurrentSlide(i);
    });
    closeHandler();
  };

  return (
    <Holder>
      <TextHolder>
        <div className="text">
          <PrismicRichText field={infoText.richText} />
        </div>
      </TextHolder>
      <Images>
        {slides.map((slide, i) => (
          <WorkInfoMedia
            key={i}
            handleClick={() => handleClick(i)}
            media={slide.primary}
            totalImages={slides.length}
            i={i}
          />
        ))}
      </Images>
      <button
        className="close-info"
        aria-label="close button"
        onClick={() => closeHandler()}
        title="Close info section"
      />
    </Holder>
  );
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

