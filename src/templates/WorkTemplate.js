import React, {useState} from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {PrismicRichText} from "@prismicio/react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";

import Gallery from "../components/molecules/Gallery";
import WorkThumbnailsHolder from "../components/molecules/WorkThumbnailsHolder";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import useInitialWorkNavSplit from "../hooks/useInitialWorkNavSplit";
import StackedImages from "../components/molecules/StackedImages";

import {useStore} from "../utils/store";

const Container = styled.div`
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  padding: 56px 0 0;
  background-color: ${({theme}) => theme.colors.white};
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
  padding: 0 16px;

  @media (${props => props.theme.breakpoints.sm}) {
    padding: 0 24px;
  }
`;
const TextHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  padding-top: 15px;
  @media (${props => props.theme.breakpoints.sm}) {
    padding-top: 24px;
    grid-template-columns: 2fr 1fr 1fr;
  }

  p,
  li {
    font-weight: 100;
  }

  > div {
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
`;

function WorkTemplate(props) {
  const {info, body} = props.data.prismicWork.data;
  useInitialGlobalNavSplit(props.globalNav, 'work', 0, true);
  useInitialWorkNavSplit(props.workNav, props.data.prismicWork.id, props.pageContext.index);

  const openGallery = useStore((state) => state.openGallery);
  const setOpenGallery = useStore((state) => state.setOpenGallery);

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Container>

      <Content>
        <TextHolder>
          <div className="text">
            <PrismicRichText field={info.richText} />
          </div>
        </TextHolder>
        <WorkThumbnailsHolder
          setCurrentSlide={i => setCurrentSlide(i)}
          openGalleryHandler={() => setOpenGallery(true)}
          slides={body}
        />
        <StackedImages slides={body} />

      </Content>

      {openGallery && (
        <Gallery
          closeHandler={() => setOpenGallery(false)}
          absolute
          slides={body}
          currentSlide={currentSlide}
          setCurrentSlide={i => setCurrentSlide(i)}
        />
      )}
    </Container>
  );
}

export default withPrismicPreview(WorkTemplate);

export const query = graphql`
  query ($id: String) {
    prismicWork(id: {eq: $id}) {
      _previewable
      id
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
                url(imgixParams: {width: 1000})
              }
              embed_poster {
                url
              }
              video {
                url
              }
              embed {
                embed_url
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

