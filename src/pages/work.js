import React from "react";
import {graphql, navigate} from "gatsby";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import NavButton from "../components/molecules/NavButton";
import WorkList from "../components/organisms/WorkList";

const Container = styled.div`
  margin-top: 48px;
`;

const Work = ({data}) => {
  return (
    <Container>
      <NavButton link={`/`} />
      <WorkList work={data.prismicHomepage.data.work} />
      <CloseButton closeHandler={() => navigate(`/`)} />
    </Container>
  );
};

export default Work;

export const workQuery = graphql`
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

