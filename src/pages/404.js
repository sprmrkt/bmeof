import React, {useRef} from "react"
import Seo from "../components/molecules/Seo"
import styled from "styled-components";
import Header from "../components/molecules/Header";
import useHorizontalHoverClassname from "../hooks/useHorizontalHoverClassname";
import {manualKerning} from "../utils/helpers";
import {useStore} from "../utils/store";
import HorizontalHoverButton from "../components/atoms/HorizontalHoverButton";

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--windowHeight);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Holder = styled.h1`
  overflow: hidden;
  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
    }
  }
`;

const NotFoundPage = () => {
  const fixedBodyRef = useRef(null);
  return (
    <>
      <HorizontalHoverButton />
      <Outer id="fixed-body" ref={fixedBodyRef}>
        <Seo title="404: Not found" />
        <Header />
        <Holder>
        <span className={`large-text-outer`}>
          <span className="large-text-wrapper">{manualKerning('Page not found')}</span>
        </span>
        </Holder>
      </Outer>
    </>
  )
}

export default NotFoundPage
