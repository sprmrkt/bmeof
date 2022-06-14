import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {ReactComponent as PlayButton} from '../../assets/svg/play.inline.svg';
import {useStore} from "../../utils/store";
import EmbedContainer from "../atoms/EmbedContainer";

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
  @media( ${props => props.theme.breakpoints.md} ) {
    display: block;
  }

  button {
    @media ( ${props => props.theme.breakpoints.md} ) {
      cursor: none;
    }
  }

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
const MobileEmbedHolder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media( ${props => props.theme.breakpoints.md} ) {
    display: none;
  }

  .mobile-embed-holder {
    position: relative;
    width: 100%;
    height: 100%;
    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: left top;
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
    <>
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
      <MobileEmbedHolder>
        <div className="mobile-embed-holder" dangerouslySetInnerHTML={{__html: embed.html}} />
        {caption && <p className="caption">{caption.text}</p>}
      </MobileEmbedHolder>
    </>
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