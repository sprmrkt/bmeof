import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import PostGallery from "../molecules/PostGallery";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Inner = styled.div`
  padding: 15px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px;
  }

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;

const GalleryHolder = styled.div`
  border-top: 1px solid;

  .work-gallery {
    .close-copyright {
      padding-bottom: 15px;
      @media ( ${props => props.theme.breakpoints.md} ) {
        padding-bottom: 48px;
      }
    }
  }
`;

function Studio(props) {
  const data = useStaticQuery(graphql`
      query BeliefQuery {
          prismicStudio {
              data {
                  text {
                      richText
                  }
                  gallery {
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
  `)
  return (
    <Holder>
      <Inner className="p-large">
        <PrismicRichText render={data.prismicStudio.data.text.richText} />
      </Inner>
      <GalleryHolder>
        <PostGallery slides={data.prismicStudio.data.gallery} closeHandler={props.closeHandler} />
      </GalleryHolder>
    </Holder>
  )
}

export default Studio;