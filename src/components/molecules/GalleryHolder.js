import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkGallery from "./WorkGallery";

const Holder = styled.div`
  height: calc(100vh - 48px);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

function GalleryHolder(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Holder>
      <WorkGallery
        extra={props.extra}
        slides={props.slides}
        setCurrentSlide={(val) => setCurrentSlide(val)}
        currentSlide={currentSlide}
        closeHandler={props.closeHandler}
      />
    </Holder>
  );
}

GalleryHolder.propTypes = {
  slides: PropTypes.array.isRequired,
  extra: PropTypes.bool,
};

export default GalleryHolder;
