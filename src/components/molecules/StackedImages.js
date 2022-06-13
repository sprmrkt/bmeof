import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import MediaItem from "./MediaItem";
import classNames from "classnames";

const Holder = styled.div`
  padding: 15px;
  min-height: calc(var(--windowHeight) - 48px);
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
  &.has-caption {
    margin-bottom: 49px;
  }
`;

function StackedImages({slides}) {
  return (
    <Holder>
      {slides.map((slide, i) => {
          const holderClasses = classNames({'has-caption': (slide.primary && slide.primary.caption && slide.primary.caption.text !== "") || (slide.caption && slide.caption.text !== "")})
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