import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import MediaItem from "./MediaItem";
import { useStore } from "../../utils/store";
import PrismicRichText from "../atoms/PrismicRichText";

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-top: 1px solid;
  background-color: ${(props) => props.theme.colors.white};
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 24px 12px 0 24px;
    display: flex;
    flex-direction: column;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }

  button {
    padding: 0;
    border: none;
    @media (${(props) => props.theme.breakpoints.md}) {
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
    margin: 16px 24px 24px 16px;
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.15;
    transition: opacity 0.25s ease-in-out;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }
`;

const ImageHolder = styled.div`
  @media (${(props) => props.theme.breakpoints.md}) {
    &:hover {
      ${Excerpt} {
        .inner {
          opacity: 1;
        }
      }

      .media-holder {
        opacity: 0.15;
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

const WorkTileHome = ({ title, open, even, image, video, excerpt }) => {
  const setCustomCursorIsVisible = useStore(
    (state) => state.setCustomCursorIsVisible
  );
  const tileClasses = classNames({
    open: open,
    even: even,
  });

  return (
    <Holder className={tileClasses}>
      <ImageHolder>
        <button
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
        >
          <div className="media-holder">
            <MediaItem media={{ image: image, video: video }} />
          </div>
          <Excerpt>
            <div className="inner p-large">
              <PrismicRichText render={excerpt.richText} />
            </div>
          </Excerpt>
        </button>
      </ImageHolder>
      <p>{title}</p>
    </Holder>
  );
};

WorkTileHome.propTypes = {
  even: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  tileHeight: PropTypes.number,
  tileWidth: PropTypes.number,
};

export default WorkTileHome;

