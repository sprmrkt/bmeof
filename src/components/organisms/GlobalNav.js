import React, {useState, useEffect, useRef} from "react";
import {useLocation} from "@reach/router";

import styled from "styled-components";
import Header from "../molecules/Header";
import PostList from "../organisms/PostList";
import NavLink from "../molecules/NavLink";
import {manualKerning} from "../../utils/helpers";
import {useStore} from "../../utils/store";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  opacity: ${({hide}) => (hide ? "0" : "1")};
  pointer-events: ${({active}) => (active ? "auto" : "none")};

  z-index: 100;
  transition: opacity ${({active}) => (active ? "300ms" : "0ms")} ease-in-out;

  & > *:first-child {
    overflow-x: hidden;
    overflow-y: ${({active}) => (active ? "scroll" : "hidden")};

    height: 100%;
  }
`;

const Heading = styled.h1`
  background-color: #c6c6c6;
`;

const TranslateWrapper = styled.div`
  position: relative;
  width: 100%;
  display: block;

  background-color: ${({theme}) => theme.colors.white};
  border-bottom: 1px solid ${({active}) => (active ? "black" : "transparent")};
  outline: 1px solid
    ${({active, theme}) => (active ? "transparent" : theme.colors.white)};

  transition:
    transform 300ms linear,
    border-color 300ms ease-in-out,
    outline-color 300ms ease-in-out;
  transform: translateY(${({distance}) => `${distance}px` || "0"});

  z-index: 1;
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
  const {navActive, workActive} = useStore();

  //state
  const location = useLocation();
  const [transitionIndex, setTransitionIndex] = useState(null);
  const [translateUp, setTranslateUp] = useState(0);
  const [translateDown, setTranslateDown] = useState(0);
  const [hide, setHide] = useState(false);

  // lifecycle
  useEffect(() => {
    const el = wrapperRef?.current;
    if (!el || location.pathname === "/") return;

    const currentLink = links.find(link =>
      location.pathname.includes(link.slug)
    );

    const currentLinkIndex = links.findIndex(
      link => link.slug === currentLink.slug
    );

    setTransitionIndex(currentLinkIndex);

    const {top, height} = currentLink?.ref?.current?.getBoundingClientRect();

    el.scrollTo(0, top);

    const up = -height + 48;
    const down = height + height / 2;

    setTranslateUp(up);
    setTranslateDown(down);
  }, [wrapperRef]);

  useEffect(() => {
    if (!navActive) return;

    setTransitionIndex(null);
    setTranslateUp(0);
    setTranslateDown(0);
  }, [navActive]);

  useEffect(() => {
    if (!workActive) {
      setTranslateUp(prev => prev - 50);
    } else {
      setTranslateUp(prev => prev + 50);
    }
  }, [workActive]);

  useEffect(() => {
    if (!navActive && !workActive) {
      setHide(false);
    }
  }, [navActive, workActive]);

  useEffect(() => {
    if (location.pathname.match(/^\/work\/.+/)) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location.pathname]);

  // render
  return (
    <Container active={navActive} hide={hide}>
      <div ref={wrapperRef}>
        <TranslateWrapper distance={translateUp}>
          <Header />
        </TranslateWrapper>

        <TranslateWrapper distance={translateUp}>
          <Heading>{manualKerning("Bear meets eagle on fire")}</Heading>
        </TranslateWrapper>

        {links.map((link, linkIndex) => (
          <TranslateWrapper
            distance={
              linkIndex <= transitionIndex ? translateUp : translateDown
            }
            active={linkIndex === transitionIndex}>
            <NavLink
              key={link?.id}
              link={link}
              index={linkIndex}
              setTransitionIndex={setTransitionIndex}
              setTranslateUp={setTranslateUp}
              setTranslateDown={setTranslateDown}
            />
          </TranslateWrapper>
        ))}

        <TranslateWrapper distance={translateDown}>
          <PostList />
        </TranslateWrapper>
      </div>
    </Container>
  );
}

export default GlobalNav;

