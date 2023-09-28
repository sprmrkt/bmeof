import React, {useState} from "react";
import styled from "styled-components";
import {graphql, useStaticQuery} from "gatsby";
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

function Gravy(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = useStaticQuery(graphql`
      query GravyQuery {
          prismicGravy {
              data {
                  gallery {
                    caption {
                        text
                    }
                      image {
                          dimensions {
                              width
                              height
                          }
                          alt
                          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                          url(imgixParams: { width: 1000 })
                      }
                  }
              }
          }
      }
  `);
  return (
    <Holder>
      <Inner className="p-large">
      </Inner>
      <GalleryHolder>
        <Gallery
          slides={data.prismicGravy.data.gallery}
          setCurrentSlide={(val) => setCurrentSlide(val)}
          currentSlide={currentSlide}
        />
      </GalleryHolder>
    </Holder>
  );
}

export default Gravy;
