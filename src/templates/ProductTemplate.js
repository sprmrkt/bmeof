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
  flex-direction: column;
  gap: 24px;

  margin-top: 48px;
  padding: 15px;

  background-color: ${({ theme }) => theme.colors.white};

  @media (${(props) => props.theme.breakpoints.sm}) {
    flex-direction: row;
    gap: 48px;

    padding: 24px;
  }

  & > * {
    flex-basis: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoints.sm}) {
    position: sticky;
    top: 0;
  }
`;

const TextHolder = styled.div`
  position: relative;
  width: 80%;

  @media (${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }

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

const ButtonHolder = styled.div`
  position: relative;
  width: 100%;

  margin-top: 12px;
  padding: 0.6rem 0 0.25rem 0;

  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  @media (${(props) => props.theme.breakpoints.sm}) {
    margin-top: 24px;
    padding: 1rem 0 0.5rem 0;
  }

  button {
    width: 100%;
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;

    @media (${(props) => props.theme.breakpoints.sm}) {
      font-size: 48px;
    }
  }
`;

function ProductTemplate(props) {
  const { body, description, price, title, title_image } =
    props.data.prismicProduct.data;
  const images = body.map((item) => item.primary.image);

  useInitialGlobalNavSplit(props.globalNav, "store", 3, true);
  useInitialStoreNavSplit(
    props.storeNav,
    props.data.prismicProduct.id,
    props.pageContext.index
  );

  return (
    <Container>
      <Content>
        <TextHolder>
          <PrismicRichText field={description.richText} />
        </TextHolder>

        <ButtonHolder>
          <button
            class="snipcart-add-item"
            data-item-id={props.data.prismicProduct.uid}
            data-item-price={price}
            data-item-url={`${process.env.GATSBY_SITE_URL}/store/${props.data.prismicProduct.uid}`}
            data-item-name={title.text}
            data-item-image={title_image.url}>
            Add to cart
          </button>
        </ButtonHolder>
      </Content>

      <ProductGallery images={images} />
    </Container>
  );
}

export default ProductTemplate;

export const query = graphql`
  query ($id: String) {
    prismicProduct(id: { eq: $id }) {
      id
      uid
      data {
        title_image {
          url(imgixParams: { width: 1000 })
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
        description {
          richText
        }
        price
        title {
          text
        }
      }
    }
  }
`;

