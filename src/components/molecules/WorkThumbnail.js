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
    cursor: pointer;
  }
  .caption {
    display: none;
  }
`;

function WorkThumbnail({ media, handleClick, totalImages, i }) {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const setCustomCursorContent = useStore(state => state.setCustomCursorContent);

  return (
    <Holder>
      <button 
       onMouseEnter={() => {
        setCustomCursorIsVisible(true);
        setCustomCursorContent(`${i + 1}/${totalImages}`);
      }}
      onMouseLeave={() => {
        setCustomCursorIsVisible(false);
        setCustomCursorContent(false);
      }}
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

