import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Image from "../atoms/Image";
import classNames from "classnames";
import useWindowSize from "../../hooks/useWindowSize";

const Holder = styled.div`
  height: calc(100vh - 48px);
  width: 100%;
  padding: 24px 24px 0 24px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 12px 0 24px;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }

  button {
    padding: 0;
    border: none;
  }

  &.hovered {
    .gatsby-image-wrapper {
      transform: translateY(${props => props.hoverDist}px);
    }

    .landscape .gatsby-image-wrapper {
      transform: translateX(${props => props.hoverDist}px);
    }
  }
`;

const ImageHolder = styled.div`
  height: calc(100% - 48px);
  overflow: hidden;
  position: relative;

  button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;

    .gatsby-image-wrapper {
      width: ${props => props.imageSize}px;
      height: ${props => props.imageSize}px;
      transition: transform 0.5s;
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

const WorkTile = ({toggleProjectHandler, toggleInfoHandler, open, infoOpen, even}) => {
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
          <Image imgName="dummy-3.jpg" />
        </button>
      </ImageHolder>
      <TextHolder className={tileClasses} >
        <p className="title">
          <button
            onClick={() => toggleProjectHandler(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>Project title</button>
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
};

export default WorkTile;