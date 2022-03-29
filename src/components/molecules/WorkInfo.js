import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import WorkInfoImage from "./WorkInfoImage";

const timeout = 1000

const Holder = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 0 24px;
  border-bottom: 1px solid;
  
  p {
    @media( ${props => props.theme.breakpoints.sm} ) {
      width: 50%;
    }
  }

  > :first-child {
    margin-top: 0;
    padding-top: 24px;
  }

  > :last-child {
    margin-bottom: 0;
    padding-bottom: 24px;
  }

  &.work-info-appear,
  &.work-info-enter {
    height: 0;
  }

  &.work-info-appear-active,
  &.work-info-appear-done,
  &.work-info-enter-active,
  &.work-info-enter-done {
    height: calc(100vh - 96px);
    transition: height ${timeout}ms;
  }

  &.work-info-exit {
    height: calc(100vh - 96px);
  }

  &.work-info-exit-active {
    height: 0;
    transition: height ${timeout}ms;
  }
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

function WorkInfo({open, images, closeHandler, setCurrentSlide}) {

  const handleClick = (i) => {
    setTimeout(() => {
      setCurrentSlide(i);
    }, timeout);
    closeHandler();
  }

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      in={open}
      timeout={timeout}
      classNames="work-info"
    >
      <Holder>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elit erat, vehicula in luctus dictum,
          euismod vitae risus. Cras at odio nec orci egestas pharetra ac et purus. Sed ultricies nunc magna, sed
          scelerisque magna vestibulum quis. Quisque enim dui, gravida faucibus ligula sit amet, lacinia tempus
          purus. </p>
        <Images>
          {images.map((image, i) =>
            <WorkInfoImage
              key={i}
              handleClick={() => handleClick(i)}
              image={image}
              totalImages={images.length}
              i={i} />
          )}
        </Images>
      </Holder>
    </CSSTransition>
  )
}

WorkInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  closeHandler: PropTypes.func.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
};

export default WorkInfo;