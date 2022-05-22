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
import Extras from "../components/organisms/Extras";
import GalleryHolder from "../components/molecules/GalleryHolder";
// import {Events} from "react-scroll";

const Holder = styled.div`
  width: 100%;
  overflow: hidden;

  h1, .h1 {
    margin-left: 12px;
  }
`;

function IndexPage({data}) {

  const {work, primary_gallery} = data.prismicHomepage.data;

  return (
    <Holder>
      <Seo title="Home" />
      <Accordion
        id="title"
        button="Bear meets eagle on fire">
        <GalleryHolder slides={primary_gallery}/>
      </Accordion>
      <Accordion
        id="belief"
        button="Think">
        <Belief />
      </Accordion>
      <Accordion
        id="work"
        button="Make">
        <WorkList work={work} />
      </Accordion>
      <Accordion
        id="studio"
        button="Studio">
        <Studio />
      </Accordion>
      <Extras />
      <LoopingScroll />
    </Holder>
  )
}

export default IndexPage;

export const homePageQuery = graphql`
    query {
        prismicHomepage {
            data {
                primary_gallery {
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
                work {
                    work_item {
                        document {
                            ... on PrismicWork {
                                id
                                data {
                                    info {
                                        richText
                                    }
                                    tile_image {
                                        alt
                                        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                                    }
                                    tile_video {
                                        url
                                    }
                                    title {
                                        text
                                    }
                                    excerpt {
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
                            }
                        }
                    }
                }
            }
        }
    }
`
