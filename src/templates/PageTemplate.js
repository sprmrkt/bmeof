import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/molecules/Seo";
import { PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import GlobalNavLinkHolder from "../components/organisms/GlobalNav/GlobalNavLinkHolder";
import { manualKerning } from "../utils/helpers";
import * as prismic from "@prismicio/client";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 56px 0 0;
  background-color: ${({theme}) => theme.colors.white};
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
  padding: 32px 16px;
  z-index: 101;

  

  @media (${props => props.theme.breakpoints.sm}) {
    padding: 32px 24px 80px;
  }

   @media (${props => props.theme.breakpoints.md}) {
    width: 60%;
  }
`;

const Heading = styled.h1`
  background: ${({ theme }) => theme.colors.white};
`;


const Copyright = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 3fr;
  align-items: end;
  padding: 0 15px;
  @media (${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    padding: 0 24px;
  }
  p {
    margin-bottom: 12px;
    margin-top: 0;
    @media (${props => props.theme.breakpoints.md}) {
      margin-bottom: 24px;
      margin-top: 0;
    }
  }
`;

const PageTemplate = ({ data }) => {
  const metaTitle = data.prismicPage.data.meta_title;
  const metaDescription = data.prismicPage.data.meta_description;
  const metaImage = data.prismicPage.data.meta_image?.url;
  const title = prismic.asText(data.prismicPage.data?.title.richText);

  return (
    <Container>
      {
        title &&   
        <GlobalNavLinkHolder active header={true}>
          <a href="/">
            <Heading>{manualKerning(title)}</Heading>
          </a>
        </GlobalNavLinkHolder>
      }
      
        <Seo title={metaTitle} description={metaDescription} image={metaImage}  />
         <Content className="text">
            <PrismicRichText field={data.prismicPage.data.text.richText} />
          </Content>
        <GlobalNavLinkHolder header={true}>
            <a href="/">
              <Heading>{manualKerning("Back")}</Heading>
            </a>
        </GlobalNavLinkHolder>
         <Copyright className="close-copyright">
        <p>&copy;</p>
        <p>
          We help good people and brands
          <br /> think and make things differently.
        </p>
      </Copyright>     
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
      }
    }
  }
`;

