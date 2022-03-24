import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";

const Holder = styled.div`
  height: calc(100vh - 60px);
  position: relative;
  .gatsby-image-wrapper {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    z-index: 1;
  }
`;
const TextHolder = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: calc(75% - 1.5rem);
  z-index: 2;
  padding: 1rem;
  background-color: ${props => props.theme.colors.white};
  @media( ${props => props.theme.breakpoints.md} ) {
    width: calc(50% - 1rem);
  }
`;

function ProductTile({product}) {
  return (
    <Holder>
      <TextHolder>
        <h3>Product title</h3>
        <p>Product description</p>
        <p>$1111</p>
        <p><a href="https://buy.stripe.com/test_14k7uD4q83iZ5zifYY" target="_blank" rel="noopener noreferrer">Buy now</a></p>
      </TextHolder>
      <Image imgName="dummy-3.jpg" />
    </Holder>
  )
}

ProductTile.propTypes = {
  product: PropTypes.object,
};

export default ProductTile;