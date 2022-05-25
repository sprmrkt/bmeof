import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import MediaItem from "./MediaItem";
import {useStore} from "../../utils/store";

const Holder = styled.div`
  button {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 66.6667%;
  }
`;


function WorkInfoMedia({media, handleClick, totalImages, i}) {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const setCustomCursorContent = useStore(state => state.setCustomCursorContent);
  return (
    <Holder>
      <button
        onClick={() => handleClick()}
        onMouseEnter={() => {
          setCustomCursorIsVisible(true);
          setCustomCursorContent(`${i + 1}/${totalImages}`);
        }}
        onMouseLeave={() => {
          setCustomCursorIsVisible(false);
          setCustomCursorContent(false);
        }}
      >
        <MediaItem media={media} embedCanPlay={false} />
      </button>
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