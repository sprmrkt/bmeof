import React from 'react';
import styled from 'styled-components';
import ProductTile from "../molecules/ProductTile";
import CloseButton from "../atoms/CloseButton";
import {graphql, useStaticQuery} from "gatsby";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
    scroll-snap-type: y proximity;
    @supports (-moz-appearance: none) {
        /*
          Disable in FF due to https://bugzilla.mozilla.org/show_bug.cgi?id=1744289
          using @supports https://stackoverflow.com/a/32455002
        */
        scroll-snap-type: none !important;
    }
`;

function ProductList(props) {
  const data = useStaticQuery(graphql`
      query ProductsQuery {
          prismicHomepage {
              data {
                  products {
                      product {
                          document {
                              ... on PrismicProducts {
                                  id
                                  data {
                                      title {
                                          text
                                      }
                                      price
                                      link {
                                          url
                                      }
                                      description {
                                          richText
                                      }
                                      gallery {
                                          image {
                                              dimensions {
                                                  width
                                                  height
                                              }
                                              alt
                                              gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
                                          }
                                          video {
                                              url
                                          }
                                          embed_poster {
                                              url
                                          }
                                          embed {
                                              html
                                              height
                                              width
                                              thumbnail_url
                                              title
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  `)

  return (
    <Holder>
      {data.prismicHomepage.data.products.map((node, i) => <ProductTile key={i} product={node.product.document}/>)}
      <CloseButton closeHandler={props.closeHandler} />
    </Holder>
  )
}

export default ProductList;