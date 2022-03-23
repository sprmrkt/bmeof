import React from 'react';
import styled from 'styled-components';
import ProductTile from "../molecules/ProductTile";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Spacer = styled.div`
  width: 100%;
  height: 60px;
`;

function ProductList() {
  return (
    <Holder>
      <ProductTile/>
      <ProductTile/>
      <ProductTile/>
      <ProductTile/>
      <Spacer/>
    </Holder>
  )
}

export default ProductList;