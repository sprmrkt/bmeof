import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import PrismicRichText from "../atoms/PrismicRichText";

const Holder = styled.div`
  height: calc(100vh - 48px);
  position: relative;
  overflow: hidden;
`;
function ProductTile({product}) {
  const {title, price, description, link} = product.data;
  return (
    <Holder>
        <div>
          <h3 className="p">{title.text}</h3>
          <PrismicRichText render={description.richText} />
        </div>
        <div>
          <p>${price}</p>
          <p><a href={link.url} target="_blank" rel="noopener noreferrer">Buy now</a></p>
        </div>
    </Holder>
  )
}

ProductTile.propTypes = {
  product: PropTypes.object,
};

export default ProductTile;