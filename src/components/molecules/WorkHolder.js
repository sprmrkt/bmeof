import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import WorkTile from "../molecules/WorkTile";
import WorkGallery from "../molecules/WorkGallery";
import WorkContentAnimation from "./WorkContentAnimation";
import WorkInfo from "./WorkInfo";
import {scroller} from "react-scroll";
import useWindowSize from "../../hooks/useWindowSize";
import {useStore} from '../../utils/store'

function WorkHolder(props) {
  const [openContent, setOpenContent] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const itemUid = uuidv4();
  const [currentSlide, setCurrentSlide] = useState(0);
  const size = useWindowSize();
  const setProjectIsOpen = useStore(state => state.setProjectIsOpen)
  const {title, tile_image, info, body} = props.node.data;

  useEffect(() => {
    if(openContent) {
      scroller.scrollTo(`${itemUid}-gallery-image-${currentSlide}`, {
        duration: 500,
        smooth: true,
        containerId: `${itemUid}-gallery-${size.width >= 576 ? 'inner' : 'holder'}`,
        horizontal: size.width >= 576,
        ignoreCancelEvents: true
      });
    }
  }, [currentSlide, size.width, itemUid, openContent]);

  const toggleHandler = (toggle) => {
    setOpenContent(toggle);
    setProjectIsOpen(toggle);
  }

  return (
    <>
      <div id={itemUid}>
        <WorkTile
          title={title.text}
          image={tile_image}
          open={openContent}
          infoOpen={openInfo}
          even={props.even}
          toggleProjectHandler={(toggle) => toggleHandler(toggle)}
          toggleInfoHandler={() => setOpenInfo(!openInfo)} />
      </div>
      <WorkContentAnimation {...props} open={openContent} itemUid={itemUid}>
        <WorkInfo
          infoText={info}
          setCurrentSlide={(i) => setCurrentSlide(i)}
          open={openInfo}
          closeHandler={() => setOpenInfo(false)}
          slides={body}/>
        <WorkGallery
          itemUid={itemUid}
          slides={body}
          currentSlide={currentSlide}
          setCurrentSlide={(i) => setCurrentSlide(i)}
          closeHandler={(toggle) => toggleHandler(toggle)}
          closeParentHandler={() => props.closeHandler()}/>
      </WorkContentAnimation>
    </>
  )
}

WorkHolder.propTypes = {
  parent: PropTypes.object.isRequired,
  parentUid: PropTypes.string.isRequired,
  even: PropTypes.bool,
  node: PropTypes.object.isRequired,
};

WorkHolder.defaultProps = {
  even: false,
};


export default WorkHolder;