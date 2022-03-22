import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import WorkTile from "../molecules/WorkTile";
import WorkGallery from "../molecules/WorkGallery";
import WorkContentAnimation from "./WorkContentAnimation";
import WorkInfo from "./WorkInfo";

function WorkHolder(props) {
  const [openContent, setOpenContent] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const itemUid = uuidv4();

  return (
    <>
      <div id={itemUid}>
        <WorkTile
          open={openContent}
          even={props.even}
          toggleProjectHandler={(toggle) => setOpenContent(toggle)}
          toggleInfoHandler={() => setOpenInfo(!openInfo)} />
      </div>
      <WorkContentAnimation {...props} open={openContent} itemUid={itemUid}>
        <WorkInfo open={openInfo}/>
        <WorkGallery />
      </WorkContentAnimation>
    </>
  )
}

WorkHolder.propTypes = {
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  even: PropTypes.bool,
};

WorkHolder.defaultProps = {
  even: false,
};


export default WorkHolder;
