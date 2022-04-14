import React from 'react';
import styled from 'styled-components';
import ProductTile from "../molecules/ProductTile";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

function ProductList(props) {
  return (
    <Holder>
      <ProductTile/>
      <ProductTile/>
      <ProductTile/>
      <ProductTile/>
      <CloseButton closeHandler={props.closeHandler}/>
    </Holder>
  )
}

export default ProductList;