import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MediaItem from "./MediaItem";
import {useStore} from "../../utils/store";


const Holder = styled.div`
  button {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 66.6667%;
    cursor: none !important;
  }
  .caption {
    display: none;
  }
`;

function WorkThumbnail({ media, handleClick, totalImages, i }) {
  const {
    setCustomCursorIsVisible,
    setCustomCursorContent
  } = useStore();

  const enterHandler = () => {
    setCustomCursorIsVisible(true);
    setCustomCursorContent(`${i + 1}/${totalImages}`);
  }

  const leaveHandler = () => {
    setCustomCursorIsVisible(false);
    setCustomCursorContent(false);
  }

  return (
    <Holder>
      <button 
       onMouseEnter={() => enterHandler()}
      onMouseLeave={() => leaveHandler()}
      onClick={() => handleClick()}>
        <MediaItem media={media} embedCanPlay={false} />
      </button>
    </Holder>
  );
}

WorkThumbnail.propTypes = {
  i: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  totalImages: PropTypes.number.isRequired,
};

export default WorkThumbnail;

