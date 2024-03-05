import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import Seo from "../molecules/Seo";

const Holder = styled.div`
  min-height: calc(100vh - 48px);
  min-height: calc(100svh - 48px);

  .close-copyright {
    padding-bottom: 15px;
    @media (${(props) => props.theme.breakpoints.md}) {
      padding-bottom: 24px !important;
    }

    p {
      margin-bottom: 0;
    }
  }
`;

const TextHolder = styled.div`
  padding: 15px;
  height: 100%;
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 24px;
  }

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;
function Hello(props) {
  const data = useStaticQuery(graphql`
    query StudioQuery {
      prismicHello {
        data {
            meta_title
            meta_description
            meta_image {
              url
            }
          text {
            richText
          }
        }
      }
    }
  `);
  const { text } = data.prismicHello.data;

  const metaTitle = data.prismicHello.data.meta_title || "Hello";
  const metaDescription = data.prismicHello.data.meta_description || null;
  const metaImage = data.prismicHello.data?.meta_image?.url || null;

  return (
    <Holder>
      <Seo title={metaTitle} description={metaDescription} image={metaImage}  />
      <TextHolder>
        <div className="p-large">
          <PrismicRichText render={text.richText} />
        </div>
      </TextHolder>
    </Holder>
  );
}

export default Hello;

