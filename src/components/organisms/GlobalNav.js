import React, {useState, useEffect} from "react";
import {useRef} from "react";

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

  z-index: 100;
  pointer-events: ${({active}) => (active ? "auto" : "none")};

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
  outline: 1px solid ${({theme}) => theme.colors.white};

  transition: transform 300ms linear;
  transform: translateY(${({distance}) => `${distance}px` || "0"});
  // will-change: transform;
  z-index: 1;
`;

function GlobalNav() {
  // store
  const {navActive} = useStore();

  //state
  const [transitionIndex, setTransitionIndex] = useState(null);
  const [translateUp, setTranslateUp] = useState(0);
  const [translateDown, setTranslateDown] = useState(0);

  // variables
  const links = [
    {
      ref: useRef(null),
      id: 1,
      slug: "/work",
      label: "Work",
    },
    {
      ref: useRef(null),
      id: 2,
      slug: "/studio",
      label: "Studio",
    },
    {
      ref: useRef(null),
      id: 3,
      slug: "/hello",
      label: "Hello",
    },
    {
      ref: useRef(null),
      id: 4,
      slug: "/store",
      label: "Store",
    },
  ];

  // lifecycle
  useEffect(() => {
    if (!navActive) return;

    setTransitionIndex(null);
    setTranslateUp(0);
    setTranslateDown(0);
  }, [navActive]);

  // render
  return (
    <Container active={navActive}>
      <div>
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
            }>
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

