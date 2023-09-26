import React, {forwardRef} from "react";

import styled from "styled-components";
import Header from "../../molecules/Header";
import GlobalNavLink from "./GlobalNavLink";
import {manualKerning} from "../../../utils/helpers";
import {useStore} from "../../../utils/store";
import GlobalNavLinkHolder from "./GlobalNavLinkHolder";

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

const GlobalNav = forwardRef((props, wrapperRef) => {
  // variables
  const links = [
    {
      id: 'work',
      slug: "/work/",
      label: "Work",
    },
    {
      id: 'studio',
      slug: "/studio/",
      label: "Studio",
    },
    {
      id: 'hello',
      slug: "/hello/",
      label: "Hello",
    },
    {
      id: 'store',
      slug: "/store/",
      label: "Store",
    },
  ];

  // store
  const { navSplitIndex } = useStore();
  const { navUpPosition } = useStore();
  const { navDownPosition } = useStore();

  // render
  return (
    <Container active={navSplitIndex === null}>
      <div ref={wrapperRef} className="global-nav-wrapper">
        <GlobalNavLinkHolder position={navUpPosition}>
          <Header />
        </GlobalNavLinkHolder>

        <GlobalNavLinkHolder position={navUpPosition}>
          <Heading>{manualKerning("Bear meets eagle on fire")}</Heading>
        </GlobalNavLinkHolder>

        {links.map((link, linkIndex) => (
          <GlobalNavLinkHolder
            key={linkIndex}
            position={
              linkIndex <= navSplitIndex ? navUpPosition : navDownPosition
            }
            active={linkIndex === navSplitIndex}>
            <GlobalNavLink
              wrapperRef={wrapperRef}
              link={link}
              index={linkIndex}
            />
          </GlobalNavLinkHolder>
        ))}

        <GlobalNavLinkHolder position={navDownPosition}>
          <Header />
        </GlobalNavLinkHolder>

        <GlobalNavLinkHolder position={navDownPosition}>
          <Heading>{manualKerning("Bear meets eagle on fire")}</Heading>
        </GlobalNavLinkHolder>
      </div>
    </Container>
  );
})

export default GlobalNav;

