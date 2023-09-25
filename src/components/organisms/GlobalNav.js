import React, {useRef} from "react";

import styled from "styled-components";
import Header from "../molecules/Header";
import GlobalNavLink from "../molecules/GlobalNavLink";
import {manualKerning} from "../../utils/helpers";
import {useStore} from "../../utils/store";
import GlobalNavLinkHolder from "../atoms/GlobalNavLinkHolder";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: ${({active}) => (active ? "auto" : "none")};
  z-index: 100;

  & > *:first-child {
    overflow-x: hidden;
    overflow-y: ${({active}) => (active ? "scroll" : "hidden")};
    height: 100%;
  }
`;

const Heading = styled.h1`
  background: lightblue;
`;

function GlobalNav() {
  // variables
  const links = [
    {
      ref: useRef(null),
      id: 1,
      slug: "/work/",
      label: "Work",
    },
    {
      ref: useRef(null),
      id: 2,
      slug: "/studio/",
      label: "Studio",
    },
    {
      ref: useRef(null),
      id: 3,
      slug: "/hello/",
      label: "Hello",
    },
    {
      ref: useRef(null),
      id: 4,
      slug: "/store/",
      label: "Store",
    },
  ];

  // ref
  const wrapperRef = useRef(null);

  // store
  const { navSplitIndex, setNavSplitIndex } = useStore();
  const { navUpPosition, setNavUpPosition } = useStore();
  const { navDownPosition, setNavDownPosition } = useStore();

  // render
  return (
    <Container active={navSplitIndex === null}>
      <div ref={wrapperRef}>
        <GlobalNavLinkHolder position={navUpPosition}>
          <Header />
        </GlobalNavLinkHolder>

        <GlobalNavLinkHolder position={navUpPosition}>
          <Heading>{manualKerning("Bear meets eagle on fire")}</Heading>
        </GlobalNavLinkHolder>

        {links.map((link, linkIndex) => (
          <GlobalNavLinkHolder
            position={
              linkIndex <= navSplitIndex ? navUpPosition : navDownPosition
            }
            active={linkIndex === navSplitIndex}>
            <GlobalNavLink
              key={link?.id}
              link={link}
              index={linkIndex}
            />
          </GlobalNavLinkHolder>
        ))}
      </div>
    </Container>
  );
}

export default GlobalNav;

