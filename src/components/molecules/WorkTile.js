import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import classNames from "classnames";
import {GatsbyImage} from "gatsby-plugin-image";

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-bottom: 1px solid;
  background-color: ${props => props.theme.colors.white};
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 12px 0 24px;
    min-height: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }
  @media ( ${props => props.theme.breakpoints.lg} ) {
    min-height: calc(100vh - 48px);
  }

  button {
    padding: 0;
    border: none;
  }
`;

const ImageHolder = styled.div`

  button {
    width: 100%;
    height: 100%;
    display: block;

    .gatsby-image-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
  }
`;

const TextHolder = styled.div`
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 24px;
  align-items: center;
  width: 100%;
  transition: all 0.25s;

  &.open {
    background-color: ${props => props.theme.colors.white};
    z-index: 20;
    position: relative;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: calc(200% + 72px);
      margin-left: -24px;
      padding: 0 24px;
      &.even {
        margin-left: calc(-100% - 48px);
      }
    }
  }

  .title {
    grid-column: span 3;
  }

  .close {
    button {
      text-align: right;
    }
  }

  p {
    margin: 0;
    text-transform: uppercase;

    button {
      line-height: 48px;
      width: 100%;
      text-align: left;
      display: inline-block;
      text-transform: uppercase;
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

  .close {
    span {
      transform: rotate(45deg);
      display: inline-block;
    }
  }
`;

const WorkTile = ({toggleProjectHandler, toggleInfoHandler, open, infoOpen, even, title, image}) => {

  const tileClasses = classNames({
    open: open,
    even: even,
  })

  return (
    <Holder
      className={tileClasses}>
      <ImageHolder>
        <button onClick={() => toggleProjectHandler(true)}>
          <GatsbyImage alt={image.alt || title} image={image.gatsbyImageData} />
        </button>
      </ImageHolder>
      <TextHolder className={tileClasses}>
        <p className="title">
          <button onClick={() => toggleProjectHandler(true)}>{title}</button>
        </p>
        {open && <p className="info">
          <button onClick={() => toggleInfoHandler()}>
            {!infoOpen && <>Info <span>+</span></>}
            {infoOpen && <>Close</>}
          </button>
        </p>}
        {open && !infoOpen && <p className="close">
          <button onClick={() => toggleProjectHandler(false)}>Back</button>
        </p>}
        {open && infoOpen && <p className="close">
          <button onClick={() => toggleInfoHandler()} title="Close info"><span>+</span></button>
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
  infoOpen: PropTypes.bool.isRequired,
  even: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
};

export default WorkTile;