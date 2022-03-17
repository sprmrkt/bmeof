import React, {forwardRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";

const Holder = styled.div`
  height: calc(100vh - 6rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: mediumspringgreen;
`;

const ImageHolder = styled.div`
  background-color: white;

  .gatsby-image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
`;

const WorkItem = forwardRef(({work}, ref) => {
  return (
    <Holder>
      <ImageHolder>
        <Image imgName="entrance-pool.jpg" />
      </ImageHolder>
      <p ref={ref}>Title</p>
    </Holder>
  )
});

WorkItem.propTypes = {
  work: PropTypes.object,
};

WorkItem.displayName = 'WorkItem'

export default WorkItem;