import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";

const timeout = 500;

const Holder = styled.div`
  position: relative;
  img {
    position: relative;
    z-index: 1;
  }
  .play {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid ${props => props.theme.colors.white};
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  background-color: ${props => props.theme.colors.black};
  transform-origin: bottom left;
  
  .close {
    position: absolute;
    top: 12px;
    right: 24px;
    font-size: 36px;
    color: ${props => props.theme.colors.white};
    transform: rotate(45deg);
    transform-origin: center;
  }

  iframe,
  object,
  embed {
    position: absolute;
    top: 24px;
    left: 24px;
    width: calc(100% - 48px);
    height: calc(100% - 48px);
    object-fit: contain;
    object-position: center;
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

function EmbedItem({embed, canPlay}) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  if (canPlay) return (
    <Holder>
      <button onClick={() => setOverlayOpen(true)}>
        <img alt={embed.title} src={embed.thumbnail_url} />
        <div className="play" />
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
          <button className="close" onClick={() => setOverlayOpen(false)}>+</button>
        </OverlayHolder>
      </CSSTransition>

    </Holder>
  )

  return (
    <Holder>
      <img alt={embed.title} src={embed.thumbnail_url} />
      <div className="play" />
    </Holder>
  )
}

EmbedItem.propTypes = {
  embed: PropTypes.object.isRequired,
  canPlay: PropTypes.bool,
};

EmbedItem.defaultProps = {
  canPlay: true,
};

export default EmbedItem;