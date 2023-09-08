import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Header from "../components/molecules/Header";
import PostList from "../components/organisms/PostList";
import {Link} from "gatsby";
import {manualKerning} from "../utils/helpers";
import AniLink from "gatsby-plugin-transition-link/AniLink";


const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  main {
    overflow: hidden;
  }
`;

const Inner = styled.div`
  padding-bottom: 15px;
  @media (${(props) => props.theme.breakpoints.md}) {
    padding-bottom: 0;
  }
`;

function IndexPage() {
  return (
    <>
      <Holder>
        <Seo title="Home" />
        <main>
          <Header />
          <Inner>
            <h1>{manualKerning('Bear meets eagle on fire')}</h1>
            <p className="h1"><AniLink fade to="/work">{manualKerning('Work')}</AniLink></p>
            <p className="h1"><Link to="/studio">{manualKerning('Studio')}</Link></p>
            <p className="h1"><Link to="/hello">{manualKerning('Hello')}</Link></p>
            <p className="h1"><Link to="/store">{manualKerning('Store')}</Link></p>
            <PostList />
          </Inner>
        </main>
      </Holder>
    </>
  );
}

export default IndexPage;

