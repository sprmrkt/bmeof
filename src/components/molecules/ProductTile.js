import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import PrismicRichText from "../atoms/PrismicRichText";
import PostGallery from "./PostGallery";

const Holder = styled.div`
  height: calc(100vh - 48px);
  position: relative;
  overflow: hidden;

  .post-gallery-holder {
    height: 100%;
  }
`;
const TextHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  z-index: 2;
  padding: 15px 15px 12px 15px;
  background-color: ${props => props.theme.colors.white};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    width: 50%;
    padding: 24px 24px 12px 24px;
  }
  > div:last-child {
    justify-self: end;
    text-align: right;
  }

  p, .p {
    text-transform: uppercase;
    margin: 0;
    font-size: 12px;
    line-height: 12px;
    @media( ${props => props.theme.breakpoints.md} ) {
      font-size: initial !important;
      line-height: initial !important;
    }
  }
`;

function ProductTile({product}) {
  const {title, price, description, link, gallery} = product.data;
  return (
    <Holder>
      <TextHolder>
        <div>
          <h3 className="p">{title.text}</h3>
          <PrismicRichText render={description.richText} />
        </div>
        <div>
          <p>${price}</p>
          <p><a href={link.url} target="_blank" rel="noopener noreferrer">Buy now</a></p>
        </div>
      </TextHolder>
      <PostGallery slides={gallery} title={title} />
    </Holder>
  )
}

ProductTile.propTypes = {
  product: PropTypes.object,
};

export default ProductTile;