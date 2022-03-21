import React, {forwardRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";

const Holder = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  p {
    margin: 0;
    padding: 1rem 0;
  }
`;

const TitleHolder = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 1rem;
  > :last-child {
    justify-self: end;
  }
`;

const ImageHolder = styled.div`
  background-color: mediumspringgreen;
  
  .gatsby-image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
`;

const WorkItem = () => {
  return (
    <Holder>
      <ImageHolder>
        <Image imgName="entrance-pool.jpg" />
      </ImageHolder>
      <TitleHolder>
        <p>Project title</p>
        <p>Info</p>
        <p>Back</p>
      </TitleHolder>
    </Holder>
  )
};

WorkItem.propTypes = {
  work: PropTypes.object,
};

export default WorkItem;