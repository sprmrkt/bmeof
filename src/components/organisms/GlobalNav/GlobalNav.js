import React, {forwardRef} from "react";
import {motion} from "framer-motion";
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

  .global-nav-wrapper {
    overflow-x: hidden;
    overflow-y: ${({active}) => (active ? "scroll" : "hidden")};
    height: 100%;
  }
`;

const Inner = styled.div`
`

const Heading = styled.h1`
  background: ${({theme}) => theme.colors.white};
  overflow: hidden;
`;

const GlobalNav = forwardRef((props, globalNavRef) => {
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
  const {navSplitIndex} = useStore();
  const {navUpPosition} = useStore();
  const {navDownPosition} = useStore();
  const hoverRight = useStore((state) => state.hoverRight);


  // render
  return (
    <Container
      active={navSplitIndex === null}>
      <div ref={globalNavRef} className="global-nav-wrapper">
        <motion.div
          className="global-nav-inner"
          animate={{x: hoverRight ? "-10%" : 0}}
          transition={{duration: 0.5}}>

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
                globalNavRef={globalNavRef}
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
        </motion.div>
      </div>
    </Container>
  );
})

export default GlobalNav;

