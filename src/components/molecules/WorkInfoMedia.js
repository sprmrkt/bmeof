import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {useMouseHovered} from "react-use";
import MediaItem from "./MediaItem";

const Holder = styled.div`
  margin: 24px 24px 0 0;
  position: relative;

  .mouse-text {
    display: none;
  }

  &:hover {
    .mouse-text {
      display: block;
    }
  }
  video, img {
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



function WorkInfoMedia({media, handleClick, totalImages, i}) {
  const ref = useRef(null);
  const {elX, elY} = useMouseHovered(ref, {bound: false, whenHovered: true});
  return (
    <Holder ref={ref}>
      <button onClick={() => handleClick()}>
        <MediaItem media={media} height={'20vh'} embedCanPlay={false}/>
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