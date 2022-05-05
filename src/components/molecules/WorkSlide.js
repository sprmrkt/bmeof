import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import MediaItem from "./MediaItem";

const Holder = styled.div`
  opacity: ${props => props.active ? 1 : 0};
`

function WorkSlide({slide, active}) {
  return (
    <Holder active={active}>
      <MediaItem media={slide.primary} />
    </Holder>
  )
}

WorkSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

export default WorkSlide;