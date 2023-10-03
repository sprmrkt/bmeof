import React from "react";
import Sticker from "../atoms/Sticker";
import {graphql, useStaticQuery} from "gatsby";
import styled from "styled-components";

const Holder = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

function StickerHolder() {
  const data = useStaticQuery(graphql`
      query LayoutQuery {
          allPrismicSticker {
              nodes {
                  id
                  data {
                      link {
                          url
                      }
                      image {
                          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                          alt
                      }
                  }
              }
          }
      }
  `)
  return (
    <Holder>
      {data.allPrismicSticker.nodes.map((sticker, i) => <Sticker key={i} sticker={sticker} />)}
    </Holder>
  )
}

export default StickerHolder;

