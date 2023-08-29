import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import MediaItem from "./MediaItem";
import { useStore } from "../../utils/store";
import PrismicRichText from "../atoms/PrismicRichText";
import WorkTileText from "./WorkTileText";

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-top: 1px solid;
  background-color: ${(props) => props.theme.colors.white};
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 24px 12px 0 24px;
    // min-height: 70vw;
    display: flex;
    flex-direction: column;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }
  @media (${(props) => props.theme.breakpoints.lg}) {
    // min-height: calc(100vh - 96px + 1px);
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
  @media (${(props) => props.theme.breakpoints.md}) {
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
  tileWidth,
}) => {
  const setCustomCursorIsVisible = useStore(
    (state) => state.setCustomCursorIsVisible
  );
  const tileClasses = classNames({
    open: open,
    even: even,
  });
  const textMarginWhenOpen = Math.max(tileHeight - tileWidth - 48 + 12, 0);

  return (
    <Holder className={tileClasses}>
      {/* <ImageHolder>
        <button
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => toggleProjectHandler(true)}>
          <div className="media-holder"><MediaItem media={{image: image, video: video}} /></div>
          <Excerpt>
            <div className="inner p-large">
              <PrismicRichText render={excerpt.richText} />
            </div>
          </Excerpt>
        </button>
      </ImageHolder> */}
      <WorkTileText
        tileClasses={tileClasses}
        textMarginWhenOpen={textMarginWhenOpen}
        open={open}
        toggleProjectHandler={(val) => toggleProjectHandler(val)}
        title={title}
        toggleInfoHandler={(val) => toggleInfoHandler(val)}
        infoOpen={infoOpen}
      />
    </Holder>
  );
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

