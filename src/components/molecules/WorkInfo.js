import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";

const timeout = 2000

const Holder = styled.div`
  background-color: khaki;
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
  width: 100%;
  > div {
    background-color: black;
    width: 150px;
    height: 100px;
    margin: 0 1rem 1rem 0;
    display: inline-block;
  }
`;

function WorkInfo({open}) {
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
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
          <div/>
        </Images>
      </Holder>
    </CSSTransition>
  )
}

WorkInfo.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default WorkInfo;