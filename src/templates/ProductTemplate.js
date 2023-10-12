import React, { useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { PrismicRichText } from "@prismicio/react";

import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import useInitialStoreNavSplit from "../hooks/useInitialStoreNavSplit";

import ProductGallery from "../components/molecules/ProductGallery";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 48px - 24px);
  overflow-x: hidden;
  overflow-y: scroll;

  display: flex;
  gap: 48px;

  margin-top: 48px;
  padding: 15px;
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding: 24px;
  }

  background-color: ${({ theme }) => theme.colors.white};
`;

const TextHolder = styled.div`
  position: sticky;
  top: 0;

  p,
  li {
    font-weight: 100;
  }

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

function ProductTemplate(props) {
  const { description, body } = props.data.prismicProduct.data;
  const images = body.map((item) => item.primary.image);

  useInitialGlobalNavSplit(props.globalNav, "store", 3, true);
  useInitialStoreNavSplit(
    props.storeNav,
    props.data.prismicProduct.id,
    props.pageContext.index
  );

  return (
    <Container>
      <TextHolder>
        <PrismicRichText field={description.richText} />
      </TextHolder>

      <ProductGallery images={images} />
    </Container>
  );
}

export default ProductTemplate;

export const query = graphql`
  query ($id: String) {
    prismicProduct(id: { eq: $id }) {
      id
      data {
        description {
          richText
        }
        body {
          ... on PrismicProductDataBodyStandardSlide {
            id
            primary {
              image {
                alt
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                url(imgixParams: { width: 1000 })
              }
            }
          }
        }
      }
    }
  }
`;

