import React from 'react';
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import styled from "styled-components";

const Holder = styled.div`
  @media ( ${props => props.theme.breakpoints.md} ) {
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
    @media ( ${props => props.theme.breakpoints.md} ) {
      margin-bottom: 0;
      height: 100%;
    }
  }
  video {
    width: 100%;
    height: auto;
    margin-bottom: 24px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      height: 100%;
      object-fit: cover;
      margin-bottom: 0;
    }
  }
`;

const EmbedHolder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`

const VideoHolder = styled.div`
  position: relative;
  height: 100%;

  
`;

function WorkSlideGrid({slide}) {
  const items = slide.items;

  return (
    <Holder>
      {items.map((item, i) => <>
        {item.image.gatsbyImageData && <GatsbyImage
          key={i}
          alt={item.image.alt || 'Project image'}
          layout="constrained"
          objectFit="contain"
          objectPosition="top left"
          image={item.image.gatsbyImageData} />}
        {!item.image.gatsbyImageData && item.embed &&
          <EmbedHolder>
            <div dangerouslySetInnerHTML={{__html: item.embed.html}} />
          </EmbedHolder>
        }
        {!item.image.gatsbyImageData && !item.embed && item.video.url &&
          <video autoPlay muted playsInline loop>
            <source src={item.video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        }
      </>)}
    </Holder>
  )
}

WorkSlideGrid.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default WorkSlideGrid;