import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import classNames from "classnames";
import useWindowSize from "../../hooks/useWindowSize";
import {GatsbyImage} from "gatsby-plugin-image";

const Holder = styled.div`
  scroll-snap-align: start;
  width: 100%;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 12px 0 24px;
    height: calc(100vh - 48px);
    &.even {
      padding: 24px 24px 0 12px;
    }
  }
  
  &.open {
    scroll-snap-align: none;
  }

  button {
    padding: 0;
    border: none;
  }

  &.hovered {
    @media ( ${props => props.theme.breakpoints.md} ) {
      .gatsby-image-wrapper {
        transform: translateY(${props => props.hoverDist}px);
      }

      .landscape .gatsby-image-wrapper {
        transform: translateX(${props => props.hoverDist}px);
      }
    }
  }
`;

const ImageHolder = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  @media ( ${props => props.theme.breakpoints.md} ) {
    height: calc(100% - 48px);
    padding-bottom: 0;
    overflow: hidden;
    position: relative;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
      @media ( ${props => props.theme.breakpoints.md} ) {
        width: ${props => props.imageSize}px;
        height: ${props => props.imageSize}px;
        transition: transform 0.5s;
      }
    }
  }

  &.landscape {

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
  const imageHolderRef = useRef(null);
  const [landscapeTile, setLandscapeTile] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [hoverDist, setHoverDist] = useState(0);
  const [hovered, setHovered] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (imageHolderRef.current) {
      const width = imageHolderRef.current.offsetWidth;
      const height = imageHolderRef.current.offsetHeight;
      setImageSize(Math.min(width, height));
      setHoverDist(Math.abs(width - height));
      if (width > height) {
        setLandscapeTile(true);
      } else {
        setLandscapeTile(false);
      }
    }
  }, [size]);

  const tileClasses = classNames({
    open: open,
    even: even,
    hovered: hovered,
  })

  return (
    <Holder
      className={tileClasses}
      hoverDist={hoverDist}>
      <ImageHolder
        ref={imageHolderRef}
        imageSize={imageSize}
        className={landscapeTile ? 'landscape' : 'portrait'}>
        <button onClick={() => toggleProjectHandler(true)}>
          <GatsbyImage alt={image.alt || title} image={image.gatsbyImageData}/>
        </button>
      </ImageHolder>
      <TextHolder className={tileClasses} >
        <p className="title">
          <button
            onClick={() => toggleProjectHandler(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>{title}</button>
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