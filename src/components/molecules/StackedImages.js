import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import MediaItem from "./MediaItem";
import classNames from "classnames";

const Holder = styled.div`
  padding: 15px 0;
  min-height: calc(100vh - 48px);
  min-height: calc(100svh - 48px);
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: none;
  }
`;
const MediaHolder = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 66.6667%;
  position: relative;
  margin-bottom: 15px;
  .caption {
    margin-top: 15px;
    margin-bottom: 0;
  }
  &.has-caption {
    margin-bottom: 44px;
  }
  &.has-long-caption {
    margin-bottom: 58px;
  }
  &.has-very-long-caption {
    margin-bottom: 72px;
  }
`;

function StackedImages({slides}) {
  return (
    <Holder>
      {slides.map((slide, i) => {
          const holderClasses = classNames({
            'has-caption': (slide.primary && slide.primary.caption && slide.primary.caption.text !== "") || (slide.caption && slide.caption.text !== ""),
            'has-long-caption': (slide.primary && slide.primary.caption && slide.primary.caption.text?.length > 45) || (slide.caption && slide.caption.text?.length > 45),
            'has-very-long-caption': (slide.primary && slide.primary.caption && slide.primary.caption.text?.length > 95) || (slide.caption && slide.caption.text?.length > 95),
          })
          return (
            <MediaHolder key={i} className={holderClasses}>
              <MediaItem media={slide.primary || slide} />
            </MediaHolder>
          )
        }
      )}
    </Holder>
  )
}

StackedImages.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default StackedImages;