import React, { forwardRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import CloseButton from "../../atoms/CloseButton";
import { useStore } from "../../../utils/store";
import StoreNavLinkHolder from "./StoreNavLinkHolder";
import StoreNavLink from "./StoreNavLink";
import { useWindowSize } from "react-use";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: visible;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) =>
    props.$active && props.$visible ? "auto" : "none"};
  z-index: 1;

  .store-nav-container {
    position: relative;
    overflow-x: hidden;
    overflow-y: ${({ $active }) => ($active ? "scroll" : "hidden")};
    height: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 48px;

  @media (${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }

  .storeTileHolder:first-child,
  .storeTileHolder:nth-child(2) {
    .storeTile {
      border-top: none;
    }
  }
`;

const LastEvenItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StoreNav = forwardRef((props, storeNavRef) => {
  const data = useStaticQuery(storeQuery);
  const { storeNavSplitIndex, storeNavUpPosition, storeNavDownPosition } =
    useStore();
  const size = useWindowSize();

  const products = data?.allPrismicProduct?.edges?.map((edge) => edge.node);

  return (
    <Container $active={storeNavSplitIndex === null} $visible={props.visible}>
      <div ref={storeNavRef} className="store-nav-container">
        <Grid>
          {products?.map((product, i) => {
            const odd = i % 2 === 0;
            const previousIsCurrent = storeNavSplitIndex === i - 1;
            const isMobile = size.width < 768;
            let goesUp = false;
            if (
              i <= storeNavSplitIndex ||
              (!odd && previousIsCurrent && !isMobile)
            ) {
              goesUp = true;
            }

            return (
              <StoreNavLinkHolder
                key={product.uid}
                index={i}
                title={product.data.title.text}
                price={product.data.price}
                position={goesUp ? storeNavUpPosition : storeNavDownPosition}>
                <StoreNavLink
                  storeNavRef={storeNavRef}
                  product={product}
                  odd={odd}
                  index={i}
                />
              </StoreNavLinkHolder>
            );
          })}
          {products.length % 2 === 1 && (
            <StoreNavLinkHolder
              position={
                storeNavSplitIndex === products.length - 1
                  ? storeNavUpPosition
                  : storeNavDownPosition
              }>
              <LastEvenItem />
            </StoreNavLinkHolder>
          )}
        </Grid>
        <StoreNavLinkHolder
          position={storeNavSplitIndex === null ? 0 : storeNavDownPosition}>
          <CloseButton />
        </StoreNavLinkHolder>
      </div>
    </Container>
  );
});

export default StoreNav;

const storeQuery = graphql`
  query StoreNav {
    allPrismicProduct {
      edges {
        node {
          id
          uid
          data {
            title {
              text
            }
            price
            excerpt {
              richText
            }
            title_image {
              alt
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;

