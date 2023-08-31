import React from "react";
import WorkList from "../components/organisms/WorkList";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import NavHolder from "../components/atoms/NavHolder";

const Holder = styled.div``;

const Work = ({ data }) => {
  return (
    <Holder>
      <NavHolder>
        <Link to="/">Back</Link>
      </NavHolder>
      <WorkList work={data.prismicHomepage.data.work} />
    </Holder>
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

