import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import Accordion from "../atoms/Accordion";

const Holder = styled.div`
  height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageHolder = styled.div`
  background-color: white;

  .gatsby-image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
`;

const Content = styled.div`
`;

function WorkItem({work}) {
  return (
    <Holder>
      <ImageHolder>
        <Image imgName="entrance-pool.jpg" />
      </ImageHolder>
      <p>Title</p>
    </Holder>
  )
}

WorkItem.propTypes = {
  work: PropTypes.object,
};

export default WorkItem;