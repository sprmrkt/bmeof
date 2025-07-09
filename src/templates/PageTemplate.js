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
        width: 50%;
    }


    h1, h2, h3, h4, h5, h6 {
        text-transform: none;
        letter-spacing: 0;
        font-size: 13px;
        line-height: 14px;
        margin: 2.5em 0 0.75em 0;
    }
    a {
        text-decoration: underline;
    }
    &.heading-style-large {
        h1, h2, h3, h4, h5, h6 {
            @media ( ${props => props.theme.breakpoints.md} ) {
                font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                font-size: 40px;
                line-height: 36px;
            }
        }
    }
    &.heading-style-small {
        h1, h2, h3, h4, h5, h6 {
            font-weight: bold;
            font-family: 'Gotham', "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            @media ( ${props => props.theme.breakpoints.md} ) {
                font-size: 15px;
                line-height: 21px;
            }
        }
    }
    &.heading-style-mixed {
        h1, h2, h3 {
            @media ( ${props => props.theme.breakpoints.md} ) {
                font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                font-size: 40px;
                line-height: 36px;
            }
        }
        h4, h5, h6 {
            font-family: 'Gotham', "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-weight: bold;
            @media ( ${props => props.theme.breakpoints.md} ) {
                font-size: 15px;
                line-height: 21px;
            }
        }
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
  const textStyle = data.prismicPage.data?.base_text_style?.toLowerCase() || "medium";
  const headingStyle = data.prismicPage.data?.heading_style?.toLowerCase() || "large";
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
      <Content className={`page-text` + ` text-style-${textStyle}` + ` heading-style-${headingStyle}`}>
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
                heading_style
            }
        }
    }
`;

