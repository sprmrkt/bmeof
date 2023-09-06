import React, {useState} from "react";
import styled from "styled-components";
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import PostGallery from "../molecules/PostGallery";
import Gallery from "../molecules/Gallery";

const Holder = styled.div`
`;

const Inner = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  grid-gap: 24px;
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 24px;
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

const GalleryHolder = styled.div`
  border-top: 1px solid;
`;

function Studio(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
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
  `);
  return (
    <Holder>
      <Inner className="p-large">
        <div>
          <PrismicRichText render={data.prismicStudio.data.text.richText} />
        </div>
        <div>
          <PrismicRichText render={data.prismicStudio.data.text_2.richText} />
        </div>
      </Inner>
      <GalleryHolder>
        <Gallery
          slides={data.prismicStudio.data.gallery}
          setCurrentSlide={(val) => setCurrentSlide(val)}
          currentSlide={currentSlide}
        />
      </GalleryHolder>
    </Holder>
  );
}

export default Studio;
