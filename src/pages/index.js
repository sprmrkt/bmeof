import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Header from "../components/molecules/Header";
import HorizontalHoverButton from "../components/atoms/HorizontalHoverButton";
import HeadingOne from "../components/molecules/HeadingOne";
import MobileFooter from "../components/organisms/MobileFooter";
import HomeLink from "../components/atoms/HomeLink";
import Extras from "../components/organisms/Extras";
import { graphql } from "gatsby";
import Stickers from "../components/atoms/Stickers";

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--windowHeight);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: none;
  main {
    overflow: hidden;
  }
`;

const Inner = styled.div`
  padding-bottom: 15px;
  @media (${(props) => props.theme.breakpoints.md}) {
    padding-bottom: 0;
  }

  h1,
  .h1 {
    margin-left: 12px;
  }
`;

function IndexPage({ data }) {
  console.log("data", data);

  return (
    <>
      <HorizontalHoverButton />
      <Holder>
        <Seo title="Home" />
        <Header />
        <main>
          {/* <Stickers></Stickers> */}
          <Stickers data={data} />
          <Inner>
            <HeadingOne />

            <HomeLink link="/work" text="WORK" />
            <HomeLink link="/studio" text="STUDIO" />
            <HomeLink link="/hello" text="HELLO" />
            <HomeLink link="/store" text="STORE" />

            <Extras />
            <MobileFooter />
          </Inner>
        </main>
      </Holder>
    </>
  );
}

export default IndexPage;

export const homeQuery = graphql`
  query homeQuery {
    stickers: allPrismicSticker {
      nodes {
        id
        data {
          link {
            url
          }
          image {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            alt
          }
        }
      }
    }
  }
`;

