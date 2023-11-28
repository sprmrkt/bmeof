import React, {forwardRef} from "react";
import {useStaticQuery, graphql} from "gatsby";
import styled from "styled-components";
import CloseButton from "../../atoms/CloseButton";
import {useStore} from "../../../utils/store";
import WorkNavLinkHolder from "./WorkNavLinkHolder";
import WorkNavLink from "./WorkNavLink";
import {useWindowSize} from "react-use";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: visible;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$active && props.$visible ? "auto" : "none")};
  z-index: 1;

  .work-nav-container {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 48px;

  @media (${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }

  .workTileHolder:first-child,
  .workTileHolder:nth-child(2) {
    .workTile {
      border-top: none;
    }
  }
`;

const LastEvenItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({theme}) => theme.colors.white};
`;

const WorkNav = forwardRef((props, workNavRef) => {
  const data = useStaticQuery(workQuery);
  const {
    workNavSplitIndex,
    workNavUpPosition,
    workNavDownPosition
  } = useStore();
  const size = useWindowSize();

  const works = data?.prismicHomepage?.data?.work?.map(
    ({work_item}) => work_item?.document
  );

  return (
    <Container $active={workNavSplitIndex === null} $visible={props.visible}>
      <div ref={workNavRef} className="work-nav-container">
        <Grid>
          {works?.map((work, i) => {
            const odd = i % 2 === 0;
            const previousIsCurrent = workNavSplitIndex === i - 1;
            const isMobile = size.width < 768;
            let goesUp = false;
            if(
              i <= workNavSplitIndex || (!odd && previousIsCurrent && !isMobile)
            ) {
              goesUp = true;
            }

            return (
              <WorkNavLinkHolder
                key={work.uid}
                index={i}
                title={work.data.title.text}
                position={ goesUp ? workNavUpPosition : workNavDownPosition }>
                <WorkNavLink
                  workNavRef={workNavRef}
                  work={work}
                  odd={odd}
                  index={i}
                />
              </WorkNavLinkHolder>
            )
          })}
          {works.length % 2 === 1 &&
            <WorkNavLinkHolder
              position={
                workNavSplitIndex === works.length - 1 ? workNavUpPosition : workNavDownPosition
              }>
              <LastEvenItem />
            </WorkNavLinkHolder>
          }

        </Grid>
        <WorkNavLinkHolder position={workNavSplitIndex === null ? 0 : workNavDownPosition}>
          <CloseButton />
        </WorkNavLinkHolder>
      </div>
    </Container>
  );
})

export default WorkNav;

const workQuery = graphql`
    query {
        prismicHomepage {
            data {
                work {
                    work_item {
                        document {
                            ... on PrismicWork {
                                uid
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
                                        richText
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

