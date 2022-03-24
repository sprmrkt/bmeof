import React, {forwardRef} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import classNames from "classnames";

const Holder = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  padding: 1rem 1rem 0 1rem;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 1rem 0.5rem 0 1rem;
    &.even {
      padding: 1rem 1rem 0 0.5rem;
    }
  }
  button {
    padding: 0;
    border: none;
  }
`;

const ImageHolder = styled.div`
  height: calc(100% - 60px);
  overflow: hidden;
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
    background-color: ${props => props.theme.colors.white};
    z-index: 20;
    position: relative;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: calc(200% + 1rem);
      &.even {
        margin-left: calc(-100% - 1rem);
      }
    }
  }
  .title {
    grid-column: span 3;
  }
  .close {
    justify-self: end;
  }
  p {
    margin: 0;
    button {
      line-height: 60px;
      width: 100%;
      text-align: left;
      display: inline-block;
    }
  }
  .info, .close {
    opacity: 0;
    transition: opacity 0.25s;
  }
  &.open {
    .title {
      grid-column: span 1;
    }
    .info, .close {
      opacity: 1;
    }
  }
`;

const WorkTile = ({toggleProjectHandler, toggleInfoHandler, open, even}) => {

  const tileClasses = classNames({open: open, even: even})

  return (
    <Holder className={tileClasses}>
      <ImageHolder>
        <button onClick={() => toggleProjectHandler(true)}>
          <Image imgName="dummy-3.jpg" />
        </button>
      </ImageHolder>
      <TextHolder className={tileClasses}>
        <p className="title">
          <button onClick={() => toggleProjectHandler(true)}>Project title</button>
        </p>
        {open && <p className="info">
          <button onClick={() => toggleInfoHandler(false)}>Info</button>
        </p>}
        {open && <p className="close">
          <button onClick={() => toggleProjectHandler(false)}>Close</button>
        </p>}
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