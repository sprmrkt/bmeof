import React, {forwardRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import classNames from "classnames";

const Holder = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  button {
    padding: 0;
    border: none;
  }
`;

const ImageHolder = styled.div`
  background-color: mediumspringgreen;
  height: calc(100% - 60px);
  button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .gatsby-image-wrapper {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
  }
`;

const TextHolder = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 1rem;
  align-items: center;
  width: 100%;
  transition: all 0.25s;
  &.open {
    background-color: darkturquoise;
    z-index: 20;
    position: relative;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: calc(200% + 1rem);
      &.even {
        margin-left: calc(-100% - 1rem);
      }
    }
  }
  
  > :last-child {
    justify-self: end;
  }
  p {
    margin: 0;
  }
  .info, .close {
    opacity: 0;
    transition: opacity 0.25s;
  }
  &.open {
    .info, .close {
      opacity: 1;
    }
  }
`;

const WorkTile = ({toggleProjectHandler, toggleInfoHandler, open, even}) => {

  const textClasses = classNames({open: open, even: even})

  return (
    <Holder>
      <ImageHolder>
        <button onClick={() => toggleProjectHandler(true)}>
          <Image imgName="entrance-pool.jpg" />
        </button>
      </ImageHolder>
      <TextHolder className={textClasses}>
        <p>
          <button onClick={() => toggleProjectHandler(true)}>Project title</button>
        </p>
        <p className="info">
          <button onClick={() => toggleInfoHandler(false)}>Info</button>
        </p>
        <p className="close">
          <button onClick={() => toggleProjectHandler(false)}>Close</button>
        </p>
      </TextHolder>
    </Holder>
  )
};

WorkTile.propTypes = {
  work: PropTypes.object,
  toggleProjectHandler: PropTypes.func.isRequired,
  toggleInfoHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  even: PropTypes.bool.isRequired,
};

export default WorkTile;