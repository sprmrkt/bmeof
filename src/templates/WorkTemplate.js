import React, {useState, useEffect, useRef} from "react";
import {graphql, Link} from "gatsby";
import styled from "styled-components";
import {PrismicRichText} from "@prismicio/react";

import Gallery from "../components/molecules/Gallery";
import WorkNav from "../components/molecules/WorkNav";
import WorkThumbnailsHolder from "../components/molecules/WorkThumbnailsHolder";
// import WorkThumbnail from "../components/molecules/WorkThumbnail";

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  background-color: ${({theme}) => theme.colors.white};

  z-index: 100;
`;
const Title = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid;
  padding: 0 15px;
  @media (${props => props.theme.breakpoints.md}) {
    padding: 0 24px;
  }
`;
const Content = styled.div`
  padding: 0 15px;
  @media (${props => props.theme.breakpoints.sm}) {
    padding: 0 24px;
  }

  overflow: hidden;
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

function WorkTemplate({data}) {
  const {title, info, body} = data.prismicWork.data;

  const works = data.prismicHomepage.data.work.map(
    ({work_item: {document}}) => ({id: document.id, ...document.data})
  );
  const index = works.findIndex(item => item.id === data.prismicWork.id);

  const [openGallery, setOpenGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const main = document.querySelector("main");
    main.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <WorkNav
        link="/work"
        current={{...data.prismicWork.data, title: null}}
        sibling={index % 2 === 0 ? works[index + 1] : works[index - 1]}
        even={index % 2 === 0}
      />

      <Title>
        <p className="title">
          <strong>{title.text}</strong>
        </p>
        {!openGallery && <Link to="/work">Back</Link>}
        {openGallery && (
          <button onClick={() => setOpenGallery(false)}>Close gallery</button>
        )}
      </Title>

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
      </Content>

      {openGallery && (
        <Gallery
          absolute
          slides={body}
          currentSlide={currentSlide}
          setCurrentSlide={i => setCurrentSlide(i)}
        />
      )}
    </Container>
  );
}

export default WorkTemplate;

export const query = graphql`
  query ($id: String) {
    prismicWork(id: {eq: $id}) {
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

    prismicHomepage {
      data {
        work {
          work_item {
            document {
              ... on PrismicWork {
                id
                data {
                  tile_image {
                    alt
                    gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                  }
                  tile_video {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

