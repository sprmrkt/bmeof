import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import WorkTile from "../molecules/WorkTile";
import WorkItemContent from "../molecules/WorkItemContent";
import WorkContentAnimation from "./WorkContentAnimation";

function WorkHolder(props) {
  const [open, setOpen] = useState(false);
  const itemUid = uuidv4();

  return (
    <>
      <div id={itemUid}>
        <WorkTile
          open={open}
          even={props.even}
          toggleProjectHandler={(toggle) => setOpen(toggle)} />
      </div>
      <WorkContentAnimation {...props} open={open} itemUid={itemUid}>
        <WorkItemContent />
      </WorkContentAnimation>
    </>
  )
}

WorkHolder.propTypes = {
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  parentButtonHeight: PropTypes.number.isRequired,
  even: PropTypes.bool,
};

WorkHolder.defaultProps = {
  even: false,
};


export default WorkHolder;
