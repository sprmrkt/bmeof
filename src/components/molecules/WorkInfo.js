import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";
import Image from "../atoms/Image";

const timeout = 1000

const Holder = styled.div`
  background-color: khaki;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }

  &.work-info-appear,
  &.work-info-enter {
    height: 0;
  }

  &.work-info-appear-active,
  &.work-info-appear-done,
  &.work-info-enter-active,
  &.work-info-enter-done {
    height: calc(100vh - 120px);
    transition: height ${timeout}ms;
  }

  &.work-info-exit {
    height: calc(100vh - 120px);
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

const ImageHolder = styled.div`
  margin: 0 1rem 1rem 0;
`;

function WorkInfo({open, images, closeHandler, setCurrentSlide}) {

  const handleClick = (i) => {
    closeHandler();
    setCurrentSlide(i);
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
            <ImageHolder key={i}>
              <button onClick={() => handleClick(i)}>
                <Image imgName={image} height="20vh" />
              </button>
            </ImageHolder>
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