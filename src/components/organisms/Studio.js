import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import PostGallery from "../molecules/PostGallery";

const Holder = styled.div`
  height: calc(100% - 48px);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  .close-copyright {
    padding-bottom: 15px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      padding-bottom: 24px !important;
    }

    p {
      margin-bottom: 0;
    }
  }
`;

const Inner = styled.div`
  min-height: calc(var(--windowHeight) - 48px - 48px);
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  grid-gap: 24px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px;
    grid-template-columns: 3fr 3fr 2fr;
  }

  > div {
    > :first-child { margin-top: 0; }

    > :last-child { margin-bottom: 0; }
  }
`;

const GalleryHolder = styled.div`
  border-top: 1px solid;

  .work-gallery {
    .close-copyright {
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
                  text_2 {
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
        <div><PrismicRichText render={data.prismicStudio.data.text.richText} /></div>
        <div><PrismicRichText render={data.prismicStudio.data.text_2.richText} /></div>
      </Inner>
      <GalleryHolder>
        <PostGallery slides={data.prismicStudio.data.gallery} closeHandler={props.closeHandler} />
      </GalleryHolder>
    </Holder>
  )
}

export default Studio;