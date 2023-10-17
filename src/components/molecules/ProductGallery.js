import React from "react";
import styled from "styled-components";

import MediaItem from "./MediaItem";

const Gallery = styled.ul`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  margin: 0;
  padding: 0;

  @media (${(props) => props.theme.breakpoints.sm}) {
    gap: 24px;
  }
`;

const MediaHolder = styled.div`
  position: relative;
  width: 100%;
  height: 0;

  padding-bottom: 100%;

  @media (${(props) => props.theme.breakpoints.sm}) {
    margin-bottom: 15px;
  }
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

