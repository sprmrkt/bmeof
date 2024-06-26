import React from 'react';
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import EmbedItem from "./EmbedItem";
import styled from "styled-components";

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  .caption {
    position: relative;
    text-align: left;
    font-weight: 100;
  }
`

function MediaItem({media, embedCanPlay}) {

  // This component tests if the media prop has image, video or embed and shows the correct content based on that

  if (media.image.gatsbyImageData) return (
    <Holder>
      <GatsbyImage
        alt={media.image.alt || ""}
        image={media.image.gatsbyImageData} />
      {media.caption && <p className="caption">{media.caption.text}</p>}
    </Holder>
  )

  if (media.embed) return <Holder><EmbedItem embed={media.embed} poster={media.embed_poster}
                                             canPlay={embedCanPlay} caption={media.caption}/></Holder>

  if (media?.video?.url) return (
    <Holder>
      <video autoPlay muted playsInline loop poster={media.image ? media.image.url : ""}>
        <source src={media.video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {media.caption && <p className="caption">{media.caption.text}</p>}
    </Holder>
  );

  return null;
}

MediaItem.propTypes = {
  media: PropTypes.object.isRequired,
  embedCanPlay: PropTypes.bool,
};

export default MediaItem;