import React from 'react';
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize";
import {GatsbyImage} from "gatsby-plugin-image";
import styled from "styled-components";

const Holder = styled.div`
  @media( ${props => props.theme.breakpoints.md} ) {
    height: 100%;
    width: calc(100vw - 48px);
    display: grid;
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .gatsby-image-wrapper {
    width: 100%;
    margin-bottom: 24px;
    @media( ${props => props.theme.breakpoints.md} ) {
      margin-bottom: 0;
      height: 100%;
    }
  }
`;

function WorkSlideGrid({slide}) {
  const images = [
    slide.primary.media_top_left.localFile,
    slide.primary.media_top_right.localFile,
    slide.primary.media_bottom_left.localFile,
    slide.primary.media_bottom_right.localFile,
  ];

  return (
    <Holder>
      {images.map(image => image ? <GatsbyImage
        alt="gatsby"
        layout="constrained"
        objectFit="contain"
        objectPosition="top left"
        image={image.childImageSharp.gatsbyImageData} /> : <div/>)}
    </Holder>
  )
}

WorkSlideGrid.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default WorkSlideGrid;