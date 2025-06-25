import React from "react";
import {graphql} from "gatsby";
import Seo from "../components/molecules/Seo";
import {PrismicRichText} from "@prismicio/react";
import styled from "styled-components";
import {manualKerning} from "../utils/helpers";
import * as prismic from "@prismicio/client";
import CloseButton from "../components/atoms/CloseButton";
import LongTitleHolder from "../components/organisms/LongTitleHolder";
import Header from "../components/molecules/Header";

const Container = styled.div`
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background-color: ${({theme}) => theme.colors.white};
`;

const Content = styled.div`
    height: 100%;
    overflow: auto;
    padding: 24px 16px;

    @media (${props => props.theme.breakpoints.sm}) {
        padding: 24px 24px 48px;
    }

    @media (${props => props.theme.breakpoints.md}) {
        width: 60%;
    }


    h1, h2, h3, h4, h5, h6 {
        text-transform: none;
        letter-spacing: 0;
    }
`;

const Heading = styled.h1`
    background: ${({theme}) => theme.colors.white};
`;

const calculateTransformPercentage = (text) => {
  const characterCount = text.length;
  const excessCharacters = Math.max(0, characterCount - 5);
  return excessCharacters * 20;
}

const calculateDuration = (text) => {
  const characterCount = text.length;
  const excessCharacters = Math.max(0, characterCount - 6);
  return 0.5 + excessCharacters * 0.05;
}

const PageTemplate = ({data}) => {
  const metaTitle = data.prismicPage.data.meta_title;
  const metaDescription = data.prismicPage.data.meta_description;
  const metaImage = data.prismicPage.data.meta_image?.url;
  const title = prismic.asText(data.prismicPage.data?.title.richText);
  const textStyle = data.prismicPage.data?.base_text_style.toLowerCase() || "medium";

  return (
    <Container>
      <Header hideText={true} />
      {
        title &&
        <LongTitleHolder
          movementPosition={calculateTransformPercentage(title)}
          duration={calculateDuration(title)}
        >
          <Heading>{manualKerning(title)}</Heading>
        </LongTitleHolder>
      }
      <Seo title={metaTitle} description={metaDescription} image={metaImage} />
      <Content className={`page-text` + ` text-style-${textStyle}`}>
        <PrismicRichText field={data.prismicPage.data.text.richText} />
      </Content>
      <CloseButton asHomeButton={true} />
    </Container>
  );
};

export default PageTemplate;

export const query = graphql`
    query ($id: String) {
        prismicPage(id: { eq: $id }) {
            id
            uid
            data {
                title {
                    richText
                }
                meta_title
                meta_description
                meta_image {
                    url
                }
                text {
                    richText
                }
                base_text_style
            }
        }
    }
`;

