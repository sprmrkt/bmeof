import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {ReactComponent as PlayButton} from '../../assets/svg/play.inline.svg';
import {useStore} from "../../utils/store";

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    position: relative;
  }

  svg {
    width: 50px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media ( ${props => props.theme.breakpoints.md} ) {
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

function EmbedItem({embed, canPlay, poster, caption}) {
  const setEmbedIsOpen = useStore(state => state.setEmbedIsOpen)
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const setEmbedContent = useStore(state => state.setEmbedContent)

  const html = embed.html
  const reg = /src\s*=\s*"(.+?)"/
  const newHtml = html.replace(reg, 'src="$1&autoplay=1"');

  if (canPlay) return (
    <Holder>
      <button
        className="open-overlay"
        onMouseEnter={() => setCustomCursorIsVisible(true)}
        onMouseLeave={() => setCustomCursorIsVisible(false)}
        onClick={() => {
          setEmbedContent(newHtml);
          setEmbedIsOpen(true);
        }}>
        <img alt={embed.title} src={poster.url || embed.thumbnail_url} />
        <PlayButton />
        {caption && <p className="caption">{caption.text}</p>}
      </button>
    </Holder>
  )

  return (
    <Holder>
      <img alt={embed.title} src={poster.url || embed.thumbnail_url} />
      <PlayButton />
    </Holder>
  )
}

EmbedItem.propTypes = {
  embed: PropTypes.object.isRequired,
  canPlay: PropTypes.bool,
  poster: PropTypes.object,
  caption: PropTypes.object,
};

EmbedItem.defaultProps = {
  canPlay: true,
};

export default EmbedItem;