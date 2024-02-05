import React, {useRef} from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Header from "../components/molecules/Header";
import {Link} from "gatsby";
// import {useStore} from "../utils/store";

const Holder = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100svh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 400;
`;

const Inner = styled.div`
    height: 100%;
    overflow: auto;
    padding: 0 16px;

    @media (${props => props.theme.breakpoints.sm}) {
        padding: 0 24px;
    }
    h1 {
        font-size: 12vw;
        margin-bottom: 24px;
    }
    a {
        text-decoration: underline;
    }
`;

const NotFoundPage = () => {
  return (
    <>
      <Holder>
        <Seo title="404: Not found" />
        <Header />
        <Inner>
          <h1>Sorry <br/>That page <br/>is missing</h1>
          <p>You may find what you are looking for on our <Link to="/">homepage</Link></p>
        </Inner>
      </Holder>
    </>
  );
};

export default NotFoundPage;

