import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Accordion from "../components/atoms/Accordion";
import WorkList from "../components/organisms/WorkList";
import LoopingScroll from "../components/organisms/LoopingScroll";
import ProductList from "../components/organisms/ProductList";
import Belief from "../components/organisms/Belief";
import Studio from "../components/organisms/Studio";
import {graphql} from "gatsby";

const Holder = styled.div`
  width: 100%;
  overflow: hidden;

  h1, .h1 {
    margin-left: 12px;
  }
`;

function IndexPage({data}) {

  const work = data.allPrismicWork.nodes;

  return (
    <Holder>
      <Seo title="Home" />
      <h1>
        <span>
        Bear<br />
        Meets<br />
        Eagle<br />
        On<br />
        Fire<br />
        </span>
      </h1>
      <Accordion
        id="work"
        button="Work">
        <WorkList work={work} />
      </Accordion>
      <Accordion
        id="belief"
        button="Belief">
        <Belief />
      </Accordion>
      <Accordion
        id="studio"
        scrollAfterOpen
        button="Studio">
        <Studio />
      </Accordion>
      <Accordion
        id="shop"
        scrollAfterOpen
        button="Shop">
        <ProductList />
      </Accordion>
      <p className="h1">
        <span>
          Some <br />
          other <br />
          links <br />
          go <br />
          here <br />
        </span>
      </p>
      <LoopingScroll />
    </Holder>
  )
}

export default IndexPage;

export const homePageQuery = graphql`
    query {
        allPrismicWork {
            nodes {
                data {
                    info {
                        richText
                    }
                    tile_image {
                        alt
                        gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
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
                                    gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
                                }
                                video {
                                    url
                                }
                                embed {
                                    html
                                    height
                                    width
                                }
                            }
                        }
                        ... on PrismicWorkDataBodyGridSlide {
                            id
                            slice_type
                            items {
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
                                embed {
                                    html
                                    height
                                    width
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
