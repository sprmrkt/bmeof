import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WorkGallery from "../components/molecules/WorkGallery";
import WorkInfo from "../components/molecules/WorkInfo";
import { convertToSlug } from "../utils/helpers";
import { graphql } from "gatsby";
import WorkTileText from "../components/molecules/WorkTileText";

function WorkHolderTemplate({ data }) {
  const [openInfo, setOpenInfo] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { title, info, body } = data.prismicWork.data;
  const itemUid = convertToSlug(title.text) + "-" + uuidv4();

  const toggleHandler = (toggle) => {
    setOpenInfo(true);
  };

  return (
    <>
      {openInfo && (
        <>
          <WorkTileText title={title.text} />
          <WorkInfo
            infoText={info}
            tags={data.prismicWork.tags}
            setCurrentSlide={(i) => setCurrentSlide(i)}
            open={openInfo}
            closeHandler={() => setOpenInfo(false)}
            slides={body}
          />
        </>
      )}

      {!openInfo && (
        <WorkGallery
          project={true}
          itemUid={itemUid}
          slides={body}
          currentSlide={currentSlide}
          setCurrentSlide={(i) => setCurrentSlide(i)}
          closeHandler={(toggle) => toggleHandler(toggle)}
        />
      )}
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
