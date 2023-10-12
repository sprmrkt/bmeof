import React, { useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import {PrismicRichText} from "@prismicio/react";

import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import useInitialStoreNavSplit from "../hooks/useInitialStoreNavSplit";

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled.div`
  padding: 0 15px;
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding: 0 24px;
  }

  overflow: hidden;
`;
const TextHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  padding-top: 15px;
  @media (${(props) => props.theme.breakpoints.sm}) {
    padding-top: 24px;
    grid-template-columns: 2fr 1fr 1fr;
  }

  p,
  li {
    font-weight: 100;
  }

  > div {
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
`;

function ProductTemplate(props) {
  const { title, price, title_image, excerpt, description } = props.data.prismicProduct.data;
  useInitialGlobalNavSplit(props.globalNav, "store", 3, true);
  useInitialStoreNavSplit(props.storeNav, props.data.prismicProduct.id, props.pageContext.index);

  return (
    <Container>
      <Content>
        <TextHolder>
          <div className="text">
            <PrismicRichText field={description.richText} />
          </div>
        </TextHolder>
      </Content>
    </Container>
  );
}

export default ProductTemplate;

export const query = graphql`
  query ($id: String) {
    prismicProduct(id: { eq: $id }) {
      id
      data {
        title {
          text
        }
        price
        title_image {
          alt
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
        excerpt {
          text
        }
        description {
          richText
        }
      }
    }
  }
`;

