import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import EmbedItem from "./EmbedItem";

function MediaItem({media, height, embedCanPlay}) {

  // This component tests if the media prop has image, video or embed and shows the correct content based on that

  if (media.image.gatsbyImageData) return (
    <GatsbyImage
      alt="gatsby"
      layout="constrained"
      style={{
        width: `calc(${media.image.dimensions.width / media.image.dimensions.height} * (${height}))`,
        height: `calc(${height})`,
      }}
      image={media.image.gatsbyImageData} />
  )

  if (media.embed) return <EmbedItem embed={media.embed} canPlay={embedCanPlay}/>

  if (media.video.url) return (
    <video autoPlay muted playsInline loop>
      <source src={media.video.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  return null;
}

MediaItem.propTypes = {
  media: PropTypes.object.isRequired,
  height: PropTypes.string,
  embedCanPlay: PropTypes.bool,
};

export default MediaItem;