import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import { ReactComponent as PlayButton } from '../../assets/svg/play.inline.svg';

const timeout = 500;

const Holder = styled.div`
  position: relative;
  img {
    position: relative;
    z-index: 1;
  }
  svg {
    width: 50px;
    height: auto;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media( ${props => props.theme.breakpoints.md} ) {
      width: 190px;
    }
  }
  .open-overlay {
    width: 100%;
    @media( ${props => props.theme.breakpoints.md} ) {
      width: auto;
    }
  }
`;

const OverlayHolder = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: #333;
  background-color: #000;
  transform-origin: bottom left;
  
  .close {
    position: absolute;
    top: ${(48 - 15) / 2}px;
    left: 15px;
    margin: 0;
    text-transform: uppercase;
    @media( ${props => props.theme.breakpoints.md} ) {
      left: 24px;
    }
  }

  iframe,
  object,
  embed {
    //position: absolute;
    //top: 48px;
    //left: 0;
    //width: 100%;
    //height: calc(100% - 96px);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: calc(100vh - 96px);
    transform: translate(-50%, -50%);
  }

  &.overlay-holder-appear,
  &.overlay-holder-enter {
    transform: scaleY(0);

    iframe,
    object,
    embed {
      opacity: 0;
    }
  }

  &.overlay-holder-appear-active,
  &.overlay-holder-appear-done,
  &.overlay-holder-enter-active,
  &.overlay-holder-enter-done {
    transform: scaleY(1);
    transition: transform ${timeout / 2}ms;

    iframe,
    object,
    embed {
      opacity: 1;
      transition: opacity ${timeout / 2}ms ${timeout / 2}ms;
    }
  }

  &.overlay-holder-exit {
    transform: scaleY(1);

    iframe,
    object,
    embed {
      opacity: 1;
    }
  }

  &.overlay-holder-exit-active {
    transform: scaleY(0);
    transition: transform ${timeout / 2}ms ${timeout / 2}ms;

    iframe,
    object,
    embed {
      opacity: 0;
      transition: opacity ${timeout / 2}ms;
    }
  }
`;

function EmbedItem({embed, canPlay, poster}) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  if (canPlay) return (
    <Holder>
      <button className="open-overlay" onClick={() => setOverlayOpen(true)}>
        <img alt={embed.title} src={poster.url || embed.thumbnail_url} />
        <PlayButton/>
      </button>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        appear
        in={overlayOpen}
        timeout={timeout}
        classNames="overlay-holder"
      >
        <OverlayHolder>
          <div dangerouslySetInnerHTML={{__html: embed.html}} />
          <button className="close" onClick={() => setOverlayOpen(false)}>Exit full screen</button>
        </OverlayHolder>
      </CSSTransition>

    </Holder>
  )

  return (
    <Holder>
      <img alt={embed.title} src={poster.url || embed.thumbnail_url} />
      <PlayButton/>
    </Holder>
  )
}

EmbedItem.propTypes = {
  embed: PropTypes.object.isRequired,
  canPlay: PropTypes.bool,
  poster: PropTypes.object,
};

EmbedItem.defaultProps = {
  canPlay: true,
};

export default EmbedItem;