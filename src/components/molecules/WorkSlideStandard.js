import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import MediaItem from "./MediaItem";

const Holder = styled.div`
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
`

function WorkSlideStandard({slide}) {
  return (
    <Holder>
      <MediaItem media={slide.primary} height="100vh - 48px - 48px"/>
    </Holder>
  )
}

WorkSlideStandard.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default WorkSlideStandard;