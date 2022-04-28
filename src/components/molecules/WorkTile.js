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
const Excerpt = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  text-align: left;
  p {
    white-space: normal;
    margin: 0 0 12px 12px;
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: ${props => props.theme.colors.black};
    transition: transform 0.75s ease-out;
  }
  &:before {
    width: 1px;
    height: 100%;
    top: 0;
    right: 0;
    transform: scaleY(0);
    transform-origin: bottom right;
    transition-delay: 0.75s;
    transition-duration: 1s;
  }
  &:after {
    height: 1px;
    width: 100%;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom left;
  }
  .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
  }
`;

const ImageHolder = styled.div`
  &:hover {
    ${Excerpt} {
      &:before {
        transform: scaleY(1);
      }
      &:after {
        transform: scaleX(1);
      }
      .inner {
        opacity: 1;
      }
    }
    .gatsby-image-wrapper {
      opacity: 0;
    }
  }
  button {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;

    .gatsby-image-wrapper {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      transition: opacity 0.1s ease-in-out;
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
          <Excerpt><div className="inner p-large"><p>Some intro text blah blah blah.</p></div></Excerpt>
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