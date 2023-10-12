import React from "react";
import styled from "styled-components";

import MediaItem from "./MediaItem";

const Gallery = styled.ul`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;

  margin: 0;
  padding: 0;
`;

const MediaHolder = styled.div`
  position: relative;
  width: 100%;
  height: 0;

  padding-bottom: 100%;
  margin-bottom: 15px;
`;

const ProductGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map((image) => (
        <MediaHolder>
          <MediaItem media={{ image }} />
        </MediaHolder>
      ))}
    </Gallery>
  );
};

export default ProductGallery;

