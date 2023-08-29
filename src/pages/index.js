import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Header from "../components/molecules/Header";
import HorizontalHoverButton from "../components/atoms/HorizontalHoverButton";
import HeadingOne from "../components/molecules/HeadingOne";
import MobileFooter from "../components/organisms/MobileFooter";
import HomeLink from "../components/atoms/HomeLink";

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

function IndexPage() {
  return (
    <>
      <HorizontalHoverButton />
      <Holder>
        <Seo title="Home" />
        <Header />
        <main>
          <Inner>
            <HeadingOne />
            <HomeLink link="/work" text="WORK" />
            <HomeLink link="/studio" text="STUDIO" />
            <HomeLink link="/hello" text="HELLO" />
            <HomeLink link="/gravy" text="GRAVY" />
            <MobileFooter />
          </Inner>
        </main>
      </Holder>
    </>
  );
}

export default IndexPage;

