import React from "react";
import {useStaticQuery, graphql, navigate, Link} from "gatsby";
import styled from "styled-components";

import CloseButton from "../../atoms/CloseButton";
import WorkNavInner from "./WorkNavInner";

import {useStore} from "../../../utils/store";
import WorkNavLinkHolder from "./WorkNavLinkHolder";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: visible;

  pointer-events: ${({active}) => (active ? "auto" : "none")};

  z-index: 1;

  & > div:first-child {
    position: relative;

    overflow-x: hidden;
    overflow-y: ${({active}) => (active ? "scroll" : "hidden")};

    height: 100%;
  }
`;

const WorkNav = () => {
  const data = useStaticQuery(workQuery);
  const {workNavSplitIndex, workNavDownPosition} = useStore();

  const works = data?.prismicHomepage?.data?.work?.map(
    ({work_item}) => work_item?.document
  );

  return (
    <Container active={workNavSplitIndex === null}>
      <div>
        <WorkNavInner works={works} />
        <WorkNavLinkHolder position={workNavSplitIndex === null ? 0 : workNavDownPosition}>
          <CloseButton />
        </WorkNavLinkHolder>
      </div>
    </Container>
  );
};

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

