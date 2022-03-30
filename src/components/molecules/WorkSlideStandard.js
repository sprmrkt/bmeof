import React from 'react';
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize";
import {GatsbyImage} from "gatsby-plugin-image";
import styled from "styled-components";

const EmbedHolder = styled.div`
  position: relative;
  width: calc(100vw - 48px);
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
  video {
    height: 100%;
    width: auto;
    max-width: calc(100vw - 48px);
    object-fit: cover;
  }
`;

function WorkSlideStandard({slide}) {
  const size = useWindowSize();
  const {image, embed, video} = slide.primary;

  return (<>
      {image.gatsbyImageData && size.width < 768 && <GatsbyImage
        alt="gatsby"
        layout="constrained"
        image={image.gatsbyImageData} />}
      {image.gatsbyImageData && size.width >= 768 && <GatsbyImage
        alt="gatsby"
        layout="constrained"
        style={{
          width: `calc(${image.dimensions.width / image.dimensions.height} * (100vh - 60px - 2rem))`,
          height: `calc(100vh - 60px - 2rem)`,
        }}
        image={image.gatsbyImageData} />}
      {!image.gatsbyImageData && embed &&
        <EmbedHolder>
          <div dangerouslySetInnerHTML={{__html: embed.html}} />
        </EmbedHolder>
      }
      {!image.gatsbyImageData && !embed && video.url &&
        <VideoHolder>
          <video autoPlay muted playsInline loop>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoHolder>
      }
    </>
  )
}

WorkSlideStandard.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default WorkSlideStandard;