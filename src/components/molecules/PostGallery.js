import React, {useState} from 'react';
import PropTypes from "prop-types";
import Gallery from "./Gallery";

function PostGallery({slides, closeHandler}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return <Gallery slides={slides} setCurrentSlide={(val) => setCurrentSlide(val)} currentSlide={currentSlide}
                  closeHandler={closeHandler} />
}

PostGallery.propTypes = {
  slides: PropTypes.array.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default PostGallery;