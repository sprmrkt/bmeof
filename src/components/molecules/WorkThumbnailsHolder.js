import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkThumbnail from "./WorkThumbnail";

const Holder = styled.div`
  display: none;
  @media (${props => props.theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
    padding: 24px 0;
  }

  svg {
    width: 50px !important;
  }
`;

function WorkThumbnailsHolder({slides, openGalleryHandler, setCurrentSlide}) {
  const handleClick = i => {
    setTimeout(() => {
      setCurrentSlide(i);
    });
    openGalleryHandler();
  };

  return (
    <Holder>
      {slides.map((slide, i) => (
        <WorkThumbnail
          key={i}
          handleClick={() => handleClick(i)}
          media={slide.primary}
        />
      ))}

    </Holder>
  );
}

WorkThumbnailsHolder.propTypes = {
  slides: PropTypes.array.isRequired,
  openGalleryHandler: PropTypes.func.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
};

export default WorkThumbnailsHolder;

