import React from "react";
import {useStaticQuery, graphql, navigate, Link} from "gatsby";
import styled from "styled-components";

import CloseButton from "../atoms/CloseButton";
import WorkList from "./WorkList";

import {useStore} from "../../utils/store";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: visible;

  pointer-events: ${({active}) => (active ? "auto" : "none")};

  z-index: 1;
  transition: opacity 0ms ${({active}) => (active ? `300ms` : `0ms`)};

  & > div:first-child {
    position: relative;

    overflow-x: hidden;
    overflow-y: ${({active}) => (active ? "scroll" : "hidden")};

    height: 100%;
  }
`;

const TranslateLink = styled(Link)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  z-index: 50;

  transition: transform 300ms linear;
  transform: translateY(${({distance}) => `${distance}` || "0"});
`;

const TranslateWrapper = styled.div`
  position: relative;
  width: 100%;
  display: block;

  transition: transform 300ms linear;
  transform: translateY(${({distance}) => `${distance}` || "0"});

  z-index: 1;
`;

const WorkLayout = () => {
  const data = useStaticQuery(workQuery);
  const {workActive} = useStore();

  const works = data?.prismicHomepage?.data?.work?.map(
    ({work_item}) => work_item?.document
  );

  return (
    <Container active={workActive}>
      <div>
        <TranslateLink to={`/`} distance={!workActive ? `-48px` : `0px`} />

        <WorkList works={works} />

        <TranslateWrapper distance={!workActive ? `100%` : `0px`}>
          <CloseButton closeHandler={() => navigate(`/`)} />
        </TranslateWrapper>
      </div>
    </Container>
  );
};

export default WorkLayout;

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

