import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WorkGallery from "../components/molecules/WorkGallery";
import WorkInfo from "../components/molecules/WorkInfo";
import { Element } from "react-scroll";
import useWindowSize from "../hooks/useWindowSize";
import { useStore } from "../utils/store";
import { convertToSlug } from "../utils/helpers";
import { graphql } from "gatsby";
import WorkTilePage from "../components/molecules/WorkTilePage";

function WorkHolderTemplate({ data }) {
  console.log("data", data);

  const [openContent, setOpenContent] = useState(true);
  const [openInfo, setOpenInfo] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { title, tile_image, tile_video, info, body, excerpt } =
    data.prismicWork.data;
  const itemUid = convertToSlug(title.text) + "-" + uuidv4();
  const size = useWindowSize();
  const setProjectIsOpen = useStore((state) => state.setProjectIsOpen);
  const tileHolder = useRef(null);
  const [tileHeight, setTileHeight] = useState(0);
  const [tileWidth, setTileWidth] = useState(0);

  useEffect(() => {
    if (tileHolder.current) {
      setTileHeight(tileHolder.current.clientHeight);
      setTileWidth(tileHolder.current.clientWidth);
    }
  }, [size, setTileHeight, setTileWidth, tileHolder]);

  const toggleHandler = (toggle) => {
    setOpenContent(toggle);
    setProjectIsOpen(toggle);
  };

  return (
    <>
      <Element name={itemUid}>
        <div ref={tileHolder}>
          <WorkTilePage
            title={title.text}
            tileHeight={tileHeight}
            tileWidth={tileWidth}
            excerpt={excerpt}
            image={tile_image}
            video={tile_video}
            open={openContent}
            infoOpen={openInfo}
            toggleProjectHandler={(toggle) => toggleHandler(toggle)}
            toggleInfoHandler={() => setOpenInfo(!openInfo)}
          />
        </div>
      </Element>
      {/* <WorkContentAnimation
        // {...props}
        open={openContent}
        itemUid={itemUid}
        tileHeight={tileHeight}
      > */}
      <WorkInfo
        infoText={info}
        tags={data.prismicWork.tags}
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
        // closeParentHandler={() => props.closeHandler()}
      />
      {/* </WorkContentAnimation> */}
    </>
  );
}

export default WorkHolderTemplate;

export const query = graphql`
  query ($id: String) {
    prismicWork(id: { eq: $id }) {
      data {
        info {
          richText
        }
        excerpt {
          richText
        }
        tile_image {
          alt
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
        tile_video {
          url
        }
        title {
          text
        }
        body {
          ... on PrismicWorkDataBodyStandardSlide {
            id
            slice_type
            primary {
              image {
                dimensions {
                  width
                  height
                }
                alt
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                url(imgixParams: { width: 1000 })
              }
              embed_poster {
                url
              }
              video {
                url
              }
              embed {
                html
                height
                width
                thumbnail_url
                title
              }
              caption {
                text
              }
            }
          }
        }
      }
      tags
    }
  }
`;

