import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import Gallery from "../components/molecules/Gallery";
import WorkThumbnailsHolder from "../components/molecules/WorkThumbnailsHolder";
import {convertToSlug} from "../utils/helpers";
import {graphql, Link} from "gatsby";
import styled from "styled-components";
import {PrismicRichText} from "@prismicio/react";
import WorkThumbnail from "../components/molecules/WorkThumbnail";

const Title = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid;
  padding: 0 15px;
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 0 24px;
  }
`;

const Content = styled.div`
  padding: 0 15px;
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding: 0 24px;
  }
`;
const TextHolder = styled.div`
  padding-top: 15px;
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding-top: 24px;
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
  const [openGallery, setOpenGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {title, info, body} = data.prismicWork.data;

  return (
    <>
      <Title>
        <p className="title">
          <strong>{title.text}</strong>
        </p>
        {!openGallery && <Link to="/work">Back</Link>}
        {openGallery && <button onClick={() => setOpenGallery(false)}>Close gallery</button>}
      </Title>
      <Content>
        <TextHolder>
          <div className="text">
            <PrismicRichText field={info.richText} />
          </div>
        </TextHolder>
        <WorkThumbnailsHolder
          setCurrentSlide={(i) => setCurrentSlide(i)}
          openGalleryHandler={() => setOpenGallery(true)}
          slides={body}
        />
      </Content>


      {openGallery && (
        <Gallery
          absolute={true}
          slides={body}
          currentSlide={currentSlide}
          setCurrentSlide={(i) => setCurrentSlide(i)}
        />
      )}
    </>
  );
}

export default WorkTemplate;

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

