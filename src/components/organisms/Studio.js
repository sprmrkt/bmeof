import React, {useState} from "react";
import styled from "styled-components";
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import Gallery from "../molecules/Gallery";
import StackedImages from "../molecules/StackedImages";
import Seo from "../molecules/Seo";

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
    display: none;
    @media (${(props) => props.theme.breakpoints.md}) {
        border-top: 1px solid;
        display: block;
    }
`;

function Studio(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = useStaticQuery(graphql`
      query BeliefQuery {
          prismicStudio {
              data {
                meta_title
                meta_description
                meta_image {
                url
                }
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

  const metaTitle = data.prismicStudio.data.meta_title || "Studio";
  const metaDescription = data.prismicStudio.data.meta_description || null;
  const metaImage = data.prismicStudio.data.meta_image.url || null;
  return (
    <Holder>
              <Seo title={metaTitle} description={metaDescription} image={metaImage}  />

      <Inner className="p-large">
        <div>
          <PrismicRichText render={data.prismicStudio.data.text.richText} />
        </div>
        <div>
          <PrismicRichText render={data.prismicStudio.data.text_2.richText} />
        </div>
        <StackedImages slides={data.prismicStudio.data.gallery} />
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
