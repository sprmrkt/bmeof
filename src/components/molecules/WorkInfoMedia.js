import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {useMouseHovered} from "react-use";
import {GatsbyImage} from "gatsby-plugin-image";

const Holder = styled.div`
  margin: 0 24px 24px 0;
  position: relative;

  .mouse-text {
    display: none;
  }

  &:hover {
    .mouse-text {
      display: block;
    }
  }
  video {
    height: 20vh;
    width: auto;
  }
`;

const MouseText = styled.div.attrs(props => ({
  style: {
    transform: `translate( ${props.x}px, ${props.y - 20}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  color: #ffff00;
  pointer-events: none;
  text-transform: uppercase;
  font-size: 40px;
  z-index: 10;
  opacity: 0;
  @media ( ${props => props.theme.breakpoints.md} ) {
    opacity: 1;
  }
`;

const EmbedHolder = styled.div`
  position: relative;
  width: ${props => props.width};
  height: 20vh;
  overflow: hidden;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

function WorkInfoMedia({media, handleClick, totalImages, i}) {
  const ref = useRef(null);
  const {elX, elY} = useMouseHovered(ref, {bound: false, whenHovered: true});
  return (
    <Holder ref={ref}>
      <button onClick={() => handleClick()}>
        {media.image.gatsbyImageData && <GatsbyImage
          alt="gatsby"
          layout="constrained"
          style={{
            width: `calc(${media.image.dimensions.width / media.image.dimensions.height} * (20vh))`,
            height: `20vh`,
          }}
          image={media.image.gatsbyImageData} />}
        {!media.image.gatsbyImageData && media.embed &&
          <EmbedHolder width={`calc(${media.embed.width / media.embed.height} * (20vh))`}>
            <div dangerouslySetInnerHTML={{__html: media.embed.html}} />
          </EmbedHolder>
        }
        {!media.image.gatsbyImageData && !media.embed && media.video.url &&
          <video autoPlay muted playsInline loop>
            <source src={media.video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        }
      </button>
      <MouseText x={elX} y={elY} className="mouse-text">{i + 1}/{totalImages}</MouseText>
    </Holder>
  )
}

WorkInfoMedia.propTypes = {
  i: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
  totalImages: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default WorkInfoMedia;