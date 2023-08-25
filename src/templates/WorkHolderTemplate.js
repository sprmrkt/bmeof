import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
// import WorkTile from "../molecules/WorkTile";
// import WorkGallery from "../molecules/WorkGallery";
// import WorkContentAnimation from "./WorkContentAnimation";
// import WorkInfo from "./WorkInfo";
import { scroller, Element } from "react-scroll";
import useWindowSize from "../hooks/useWindowSize";
import { useStore } from "../utils/store";
import { convertToSlug } from "../utils/helpers";
import { graphql } from "gatsby";

function WorkHolderTemplate({ data }) {
  console.log("data", data);

  const title = data.prismicWork.data.title?.text;

  // const [openContent, setOpenContent] = useState(false);
  // const [openInfo, setOpenInfo] = useState(false);
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const { title, tile_image, tile_video, info, body, excerpt } =
  //   props.node.data;
  // const itemUid = convertToSlug(title.text) + "-" + uuidv4();
  // const size = useWindowSize();
  // const setProjectIsOpen = useStore((state) => state.setProjectIsOpen);
  // const tileHolder = useRef(null);
  // const [tileHeight, setTileHeight] = useState(0);
  // const [tileWidth, setTileWidth] = useState(0);

  // useEffect(() => {
  //   if (tileHolder.current) {
  //     setTileHeight(tileHolder.current.clientHeight);
  //     setTileWidth(tileHolder.current.clientWidth);
  //   }
  // }, [size, setTileHeight, setTileWidth, tileHolder]);

  // const toggleHandler = (toggle) => {
  //   setOpenContent(toggle);
  //   setProjectIsOpen(toggle);
  // };

  return (
    <>
      <p>{title}</p>
      {/* <Element name={itemUid}>
        <div ref={tileHolder}>
          <WorkTile
            title={title.text}
            tileHeight={tileHeight}
            tileWidth={tileWidth}
            excerpt={excerpt}
            image={tile_image}
            video={tile_video}
            open={openContent}
            infoOpen={openInfo}
            even={props.even}
            toggleProjectHandler={(toggle) => toggleHandler(toggle)}
            toggleInfoHandler={() => setOpenInfo(!openInfo)}
          />
        </div>
      </Element>
      <WorkContentAnimation
        {...props}
        open={openContent}
        itemUid={itemUid}
        tileHeight={tileHeight}
      >
        <WorkInfo
          infoText={info}
          tags={props.node.tags}
          setCurrentSlide={(i) => setCurrentSlide(i)}
          open={openInfo}
          closeHandler={() => setOpenInfo(false)}
          slides={body}
        />
        <WorkGallery
          itemUid={itemUid}
          slides={body}
          currentSlide={currentSlide}
          setCurrentSlide={(i) => setCurrentSlide(i)}
          closeHandler={(toggle) => toggleHandler(toggle)}
          closeParentHandler={() => props.closeHandler()}
        />
      </WorkContentAnimation> */}
    </>
  );
}

// WorkHolderTemplate.propTypes = {
//   parent: PropTypes.object.isRequired,
//   parentUid: PropTypes.string.isRequired,
//   even: PropTypes.bool,
//   node: PropTypes.object.isRequired,
// };

// WorkHolderTemplate.defaultProps = {
//   even: false,
// };

export default WorkHolderTemplate;

export const query = graphql`
  query ($id: String) {
    prismicWork(id: { eq: $id }) {
      data {
        title {
          text
        }
      }
    }
  }
`;

