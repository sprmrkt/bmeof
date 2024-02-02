import React, { useRef } from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Header from "../components/molecules/Header";
// import {useStore} from "../utils/store";

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Holder = styled.h1`
  overflow: hidden;
`;

const NotFoundPage = () => {
  const fixedBodyRef = useRef(null);
  return (
    <>
      <Outer id="fixed-body" ref={fixedBodyRef}>
        <Seo title="404: Not found" />
        <Header />
        <Holder>Page not found</Holder>
      </Outer>
    </>
  );
};

export default NotFoundPage;

