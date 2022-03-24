import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import WorkTile from "../molecules/WorkTile";
import WorkGallery from "../molecules/WorkGallery";
import WorkContentAnimation from "./WorkContentAnimation";
import WorkInfo from "./WorkInfo";
import {scroller} from "react-scroll";
import useWindowSize from "../../hooks/useWindowSize";

const images = [
  'dummy-1.jpg',
  'dummy-2.jpg',
  'dummy-3.jpg',
  'dummy-4.jpg',
  'dummy-5.jpg',
  'dummy-6.png',
  'dummy-7.jpg',
]

function WorkHolder(props) {
  const [openContent, setOpenContent] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const itemUid = uuidv4();
  const [currentSlide, setCurrentSlide] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    scroller.scrollTo(`${itemUid}-gallery-image-${currentSlide}`, {
      duration: 500,
      smooth: true,
      containerId: `${itemUid}-gallery-${size.width>= 576 ? 'inner' : 'holder'}`,
      horizontal: size.width>= 576,
    });
  }, [currentSlide, size.width, itemUid]);

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
        <WorkInfo
          setCurrentSlide={(i) => setCurrentSlide(i)}
          open={openInfo}
          closeHandler={() => setOpenInfo(false)}
          images={images}/>
        <WorkGallery
          itemUid={itemUid}
          images={images}
          currentSlide={currentSlide}
          setCurrentSlide={(i) => setCurrentSlide(i)}
          closeHandler={() => setOpenContent(false)}
          closeParentHandler={() => props.closeHandler()}/>
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
