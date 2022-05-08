import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import { ReactComponent as PlayButton } from '../../assets/svg/play.inline.svg';
import {useMouseHovered} from "react-use";

const timeout = 500;

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
    height: 100%;
    position: relative;
    .mouse-text {
      opacity: 0;
    }

    &:hover {
      .mouse-text {
        opacity: 1;
      }
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
  font-family: 'Gotham', "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  
  .close {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    
    .exit-text, .cross {
      margin: 0;
      position: absolute;
      top: ${(48 - 15) / 2}px;
      left: 15px;
      @media( ${props => props.theme.breakpoints.md} ) {
        left: 24px;
      }
    }
    .cross {
      left: auto;
      right: 15px;
      @media( ${props => props.theme.breakpoints.md} ) {
        left: auto;
        right: 24px;
      }
    }
  }

  iframe,
  object,
  embed {
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

const MouseText = styled.div.attrs(props => ({
  style: {
    transform: `translate( ${props.x}px, ${props.y - 20}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  color: #ffff00;
  pointer-events: none;
  transition: transform 100ms ease-out, opacity 10ms 100ms linear;
  text-transform: uppercase;
  font-size: 40px;
`;

function EmbedItem({embed, canPlay, poster}) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const ref = useRef(null);
  const mouseHovered = useMouseHovered(ref, {bound: false, whenHovered: true});

  const html = embed.html
  const reg = /src\s*=\s*"(.+?)"/
  const newHtml = html.replace(reg, 'src="$1&autoplay=1"');

  if (canPlay) return (
    <Holder>
      <button ref={ref} className="open-overlay" onClick={() => setOverlayOpen(true)}>
        <MouseText x={mouseHovered.elX} y={mouseHovered.elY} className="mouse-text">Play</MouseText>
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
          <button className="close" onClick={() => setOverlayOpen(false)}>
            <p className="exit-text">Exit full screen</p>
            <p className="cross">X</p>
          </button>
          <div dangerouslySetInnerHTML={{__html: newHtml}} />
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