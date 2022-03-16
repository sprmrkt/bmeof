import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import Image from "../atoms/Image";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media ( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Preview = styled.div`
  height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageHolder = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  background-color: white;
`;

function Work() {
  useLockBodyScroll();
  return (
    <Holder>
      <Preview>
        <ImageHolder>
          <Image imgName="redfern.jpg" />
        </ImageHolder>
        <p>Title</p>
      </Preview>
      <Preview>
        <ImageHolder>
          <Image imgName="redfern.jpg" />
        </ImageHolder>
        <p>Title</p>
      </Preview>
      <Preview>
        <ImageHolder>
          <Image imgName="redfern.jpg" />
        </ImageHolder>
        <p>Title</p>
      </Preview>
      <Preview>
        <ImageHolder>
          <Image imgName="redfern.jpg" />
        </ImageHolder>
        <p>Title</p>
      </Preview>
      <Preview>
        <ImageHolder>
          <Image imgName="redfern.jpg" />
        </ImageHolder>
        <p>Title</p>
      </Preview>
      <Preview>
        <ImageHolder>
          <Image imgName="redfern.jpg" />
        </ImageHolder>
        <p>Title</p>
      </Preview>
    </Holder>
  )
}

export default Work;