import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MediaItem from "./MediaItem";

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

function WorkThumbnail({ media, handleClick }) {
  return (
    <Holder>
      <button onClick={() => handleClick()}>
        <MediaItem media={media} embedCanPlay={false} />
      </button>
    </Holder>
  );
}

WorkThumbnail.propTypes = {
  media: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default WorkThumbnail;

