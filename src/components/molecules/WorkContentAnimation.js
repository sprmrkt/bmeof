import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from "react-transition-group";
import WorkContentAnimationInner from "./WorkContentAnimationInner";

const timeout = 1000;

function WorkContentAnimation(props) {

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      appear
      in={props.open}
      timeout={timeout}
      classNames="work-content"
    >
      <WorkContentAnimationInner {...props}/>
    </CSSTransition>
  )
}

WorkContentAnimation.propTypes = {
  itemUid: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  open: PropTypes.bool,
};


export default WorkContentAnimation;
