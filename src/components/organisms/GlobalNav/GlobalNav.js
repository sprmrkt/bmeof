import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import { globalHistory } from "@reach/router";
import Header from "../../molecules/Header";
import GlobalNavLink from "./GlobalNavLink";
import { manualKerning } from "../../../utils/helpers";
import { useStore } from "../../../utils/store";
import GlobalNavLinkHolder from "./GlobalNavLinkHolder";
import StickerHolder from "../StickerHolder";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  z-index: 100;

  .global-nav-wrapper {
    overflow-x: hidden;
    overflow-y: ${({ $active }) => ($active ? "scroll" : "hidden")};
    height: 100%;
    overscroll-behavior: none;

    .global-nav-inner {
      position: relative;
    }
  }
`;

const Heading = styled.h1`
  background: ${({ theme }) => theme.colors.white};
`;

const GlobalNav = forwardRef((props, globalNavRef) => {
  // variables
  const links = [
    {
      id: "work",
      slug: "/work/",
      label: "Work",
    },
    {
      id: "studio",
      slug: "/studio/",
      label: "Studio",
    },
    {
      id: "hello",
      slug: "/hello/",
      label: "Hello",
    },
    {
      id: "gravy",
      slug: "/gravy/",
      label: "Gravy",
    },
  ];

  // store
  const { navSplitIndex } = useStore();
  const { navUpPosition } = useStore();
  const { navDownPosition } = useStore();

  const onHeaderClick = (ev) => {
    ev.preventDefault();

    document
      .querySelector("#work")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const historyListener = globalHistory.listen(() => {
      // detect navigation with browser arrows
      if (!globalHistory.location.action) {
        // reload the page to get it in proper position
        window.location.reload();
      }
    });

    // unsubscribing
    return historyListener;
  }, []);

  // render
  return (
    <Container $active={navSplitIndex === null}>
      <div ref={globalNavRef} className="global-nav-wrapper">
        <div className="global-nav-inner">
          <StickerHolder />
          <GlobalNavLinkHolder position={navUpPosition}>
            <Header />
          </GlobalNavLinkHolder>

          <GlobalNavLinkHolder position={navUpPosition}>
            <a href="#work" onClick={(ev) => onHeaderClick(ev)}>
              <Heading>{manualKerning("Bear meets eagle on fire")}</Heading>
            </a>
          </GlobalNavLinkHolder>

          {links.map((link, linkIndex) => (
            <GlobalNavLinkHolder
              key={linkIndex}
              id={link.id}
              position={
                linkIndex <= navSplitIndex ? navUpPosition : navDownPosition
              }
              active={linkIndex === navSplitIndex}
            >
              <GlobalNavLink
                globalNavRef={globalNavRef}
                link={link}
                index={linkIndex}
              />
            </GlobalNavLinkHolder>
          ))}

          <GlobalNavLinkHolder position={navDownPosition}>
            <a
              className="button h1"
              href="https://www.instagram.com/bearmeetseagleonfire/"
              target="_blank"
              rel="noreferrer"
            >
              {manualKerning("Insta")}
            </a>
          </GlobalNavLinkHolder>
          <GlobalNavLinkHolder position={navDownPosition}>
            <Header bottom />
          </GlobalNavLinkHolder>
        </div>
      </div>
    </Container>
  );
});

export default GlobalNav;

