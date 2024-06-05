import React from "react";
import Sticker from "../atoms/Sticker";
import {graphql, useStaticQuery} from "gatsby";

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
                          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
                          alt
                      }
                  }
              }
          }
      }
  `)
  return data.allPrismicSticker.nodes.map((sticker, i) => <Sticker key={i} sticker={sticker} />)
}

export default StickerHolder;

