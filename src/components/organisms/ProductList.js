import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import ProductTile from "../molecules/ProductTile";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const CloseHolder = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 60px;
`;

function ProductList({closeHandler}) {
  return (
    <Holder>
      <ProductTile/>
      <ProductTile/>
      <ProductTile/>
      <ProductTile/>
      <CloseHolder>
        <button className="close-button" onClick={() => closeHandler()}><span>Close</span></button>
      </CloseHolder>
    </Holder>
  )
}

ProductList.propTypes = {
  closeHandler: PropTypes.func,
};

export default ProductList;