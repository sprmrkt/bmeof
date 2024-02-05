import React, {useState} from "react";
import styled from "styled-components";
import {graphql, useStaticQuery} from "gatsby";
import Gallery from "../molecules/Gallery";
import StackedImages from "../molecules/StackedImages";

const Holder = styled.div`
`;

const StackedImagesHolder = styled.div`
    margin: 0 15px;
    @media (${(props) => props.theme.breakpoints.md}) {
        display: none;
    }
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
      <StackedImagesHolder>
        <StackedImages slides={data.prismicGravy.data.gallery} />
      </StackedImagesHolder>
      <Gallery
        slides={data.prismicGravy.data.gallery}
        setCurrentSlide={(val) => setCurrentSlide(val)}
        currentSlide={currentSlide}
      />
    </Holder>
  );
}

export default Gravy;
