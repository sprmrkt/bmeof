import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import classNames from "classnames";
import MediaItem from "./MediaItem";
import {useStore} from "../../utils/store";
import PrismicRichText from "../atoms/PrismicRichText";

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-top: 1px solid;
  background-color: ${props => props.theme.colors.white};
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px 12px 0 24px;
    min-height: 70vw;
    display: flex;
    flex-direction: column;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }
  @media ( ${props => props.theme.breakpoints.lg} ) {
    min-height: calc(100vh - 96px + 1px);
  }

  button {
    padding: 0;
    border: none;
    @media ( ${props => props.theme.breakpoints.md} ) {
      cursor: none;
    }
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
    margin: 0 24px 24px 0;
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }
`;

const ImageHolder = styled.div`
  @media ( ${props => props.theme.breakpoints.md} ) {
    &:hover {
      ${Excerpt} {
        .inner {
          opacity: 1;
        }
      }

      .media-holder {
        opacity: 0;
      }
    }
  }

  button {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    display: block;
    position: relative;

    .media-holder {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
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
  margin-top: 0;

  &.open {
    background-color: ${props => props.theme.colors.white};
    position: relative;
    border-bottom: 1px solid;
    width: calc(100% + 30px);
    margin-left: -15px;
    padding: 0 15px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: calc(200% + 72px);
      margin-left: -24px;
      padding: 0 24px;
      margin-top: ${props => props.textMarginWhenOpen}px;
      &.even {
        margin-left: calc(-100% - 48px);
      }
    }
  }

  .title {
    grid-column: span 3;
  }

  .close {
    &.close-info-secondary {
      display: none;
      @media ( ${props => props.theme.breakpoints.md} ) {
        display: block;
      }
    }

    button {
      text-align: right;
    }
  }

  p {
    margin: 0;

    button {
      line-height: 48px;
      width: 100%;
      text-align: left;
      display: inline-block;
    }
  }

  .info, .close {
    opacity: 0;
    transition: opacity 0.25s;
  }

  .info {
    .info-text {
      display: none;
      @media ( ${props => props.theme.breakpoints.md} ) {
        display: inline;
      }
    }

    .close-info-text {
      display: none;
      @media ( ${props => props.theme.breakpoints.md} ) {
        display: inline;
      }
    }

    .close-info-cross {
      @media ( ${props => props.theme.breakpoints.md} ) {
        display: none;
      }
    }
  }

  &.open {
    .title {
      grid-column: span 1;
    }

    .info, .close {
      opacity: 1;
    }
  }

  .close-info-cross {
    transform: rotate(45deg);
    display: inline-block;
  }
`;

const WorkTile = ({
                    toggleProjectHandler,
                    toggleInfoHandler,
                    open,
                    infoOpen,
                    even,
                    title,
                    image,
                    video,
                    excerpt,
                    tileHeight,
                    tileWidth
                  }) => {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const tileClasses = classNames({
    open: open,
    even: even,
  })
  const textMarginWhenOpen = Math.max(tileHeight - tileWidth - 48 + 12, 0);

  return (
    <Holder
      className={tileClasses}>
      <ImageHolder>
        <button
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => toggleProjectHandler(true)}>
          <div className="media-holder"><MediaItem media={{image: image, video: video}} /></div>
          <Excerpt>
            <div className="inner p-large">
              <PrismicRichText render={excerpt.richText}/>
            </div>
          </Excerpt>
        </button>
      </ImageHolder>
      <TextHolder className={tileClasses} textMarginWhenOpen={textMarginWhenOpen}>
        <p className="title">
          <button
            onMouseEnter={() => setCustomCursorIsVisible(true)}
            onMouseLeave={() => setCustomCursorIsVisible(false)}
            onClick={() => toggleProjectHandler(true)}>{title}</button>
        </p>
        {open && <p className="info">
          <button
            onMouseEnter={() => setCustomCursorIsVisible(true)}
            onMouseLeave={() => setCustomCursorIsVisible(false)}
            onClick={() => toggleInfoHandler()}>
            {!infoOpen && <><span className="info-text">Project Overview </span><span className="info-plus">+</span></>}
            {infoOpen && <><span className="close-info-text">Close</span><span className="close-info-cross">+</span></>}
          </button>
        </p>}
        {open && !infoOpen && <p className="close">
          <button
            onMouseEnter={() => setCustomCursorIsVisible(true)}
            onMouseLeave={() => setCustomCursorIsVisible(false)}
            onClick={() => toggleProjectHandler(false)}>Back</button>
        </p>}
        {open && infoOpen && <p className="close close-info-secondary">
          <button
            onMouseEnter={() => setCustomCursorIsVisible(true)}
            onMouseLeave={() => setCustomCursorIsVisible(false)}
            onClick={() => toggleInfoHandler()} title="Close info"><span className="close-info-cross">+</span>
          </button>
        </p>}
      </TextHolder>
    </Holder>
  )
};

WorkTile.propTypes = {
  toggleProjectHandler: PropTypes.func.isRequired,
  toggleInfoHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  infoOpen: PropTypes.bool.isRequired,
  even: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  tileHeight: PropTypes.number,
  tileWidth: PropTypes.number,
};

export default WorkTile;