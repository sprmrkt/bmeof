import React, {useRef} from "react";
import {navigate} from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

import MediaItem from "./MediaItem";
import PrismicRichText from "../atoms/PrismicRichText";

import {useStore} from "../../utils/store";

const Button = styled.button`
  width: 100%;
`;

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-top: 1px solid;
  background-color: ${props => props.theme.colors.white};
  @media (${props => props.theme.breakpoints.md}) {
    padding: 24px 12px 0 24px;
    display: flex;
    flex-direction: column;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }
  p {
    text-align: left;
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
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;

  @media (${props => props.theme.breakpoints.md}) {
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

  .media-holder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    transition: opacity 0.1s ease-in-out;
  }
`;

const WorkTile = ({
  even,
  work,
  index,
  setTransitionIndex,
  setTranslateUp,
  setTranslateDown,
}) => {
  const {title, tile_image, tile_video, excerpt} = work.data;

  //store
  const {workActive, closeWork} = useStore();

  // refs
  const workRef = useRef(null);

  // variables
  const link = work.uid && `/work/${work.uid}`;
  const tileClasses = classNames({
    workTile: true,
    even: even,
  });

  // methods
  const calculateTranslateDistance = () => {
    const el = workRef?.current;
    if (!el) return;

    const {top, bottom} = el?.getBoundingClientRect();

    const windowHeight = window?.innerHeight;

    const up = -bottom + 96;
    const down = windowHeight - top;

    setTranslateUp(up);
    setTranslateDown(down);
  };

  const handleNavigate = () => {
    navigate(link);

    setTimeout(() => {
      closeWork();
      setTransitionIndex(index);
      calculateTranslateDistance();
    }, [100]);
  };

  return (
    <Button
      ref={workRef}
      data-id={work.id}
      role="button"
      className="workTileHolder"
      onClick={handleNavigate}>
      <Holder className={tileClasses}>
        <ImageHolder>
          <div className="media-holder">
            <MediaItem
              media={{
                image: tile_image,
                video: tile_video,
              }}
            />
          </div>
          <Excerpt>
            <div className="inner p-large">
              <PrismicRichText render={excerpt?.richText} />
            </div>
          </Excerpt>
        </ImageHolder>
        {workActive && <p>{title.text}</p>}
      </Holder>
    </Button>
  );
};

WorkTile.propTypes = {
  even: PropTypes.bool.isRequired,
  work: PropTypes.object.isRequired,
};

export default WorkTile;

