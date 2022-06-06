import React, {useEffect, useRef} from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Accordion from "../components/atoms/Accordion";
import WorkList from "../components/organisms/WorkList";
import LoopingScroll from "../components/organisms/LoopingScroll";
import Studio from "../components/organisms/Studio";
import Hello from "../components/organisms/Hello";
import {graphql} from "gatsby";
import Extras from "../components/organisms/Extras";
import GalleryHolder from "../components/molecules/GalleryHolder";
import Header from "../components/molecules/Header";
import {useWindowSize} from "react-use";
import {useStore} from "../utils/store";

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--windowHeight);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Inner = styled.div`
  padding-bottom: 15px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding-bottom: 0;
  }

  h1, .h1 {
    margin-left: 12px;
  }
`;


const Hover = styled.div`
  display: none;
  @media ( ${props => props.theme.breakpoints.md} ) {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    display: ${props => props.accordionIsOpen ? 'none' : 'block'};
  }
`;

function IndexPage({data}) {
  const fixedBodyRef = useRef(null);
  const {work, primary_gallery} = data.prismicHomepage.data;
  const size = useWindowSize();
  const setHorizontalHover = useStore(state => state.setHorizontalHover);
  const accordionIsOpen = useStore(state => state.accordionIsOpen);

  useEffect(() => {
    document.documentElement.style.setProperty('--windowHeight', `${size.height}px`);
  }, [size]);

  return (
    <>
      <Hover
        accordionIsOpen={accordionIsOpen}
        onMouseEnter={() => setHorizontalHover(true)}
        onMouseLeave={() => setHorizontalHover(false)}
      />
      <Holder id="fixed-body" ref={fixedBodyRef}>
        <Seo title="Home" />
        <Header />
        <main>
          <Inner>
            <Accordion
              fixedBody={fixedBodyRef}
              id="title"
              button="Bear meets eagle on fire">
              <GalleryHolder slides={primary_gallery} />
            </Accordion>
            <Accordion
              fixedBody={fixedBodyRef}
              id="work"
              button="Work">
              <WorkList work={work} />
            </Accordion>
            <Accordion
              fixedBody={fixedBodyRef}
              id="studio"
              button="Studio">
              <Studio />
            </Accordion>
            <Accordion
              fixedBody={fixedBodyRef}
              id="hello"
              button="Hello">
              <Hello />
            </Accordion>
            <Extras
              fixedBody={fixedBodyRef} />
            <LoopingScroll fixedBody={fixedBodyRef} />
          </Inner>
        </main>
      </Holder>
    </>
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
                                tags
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
