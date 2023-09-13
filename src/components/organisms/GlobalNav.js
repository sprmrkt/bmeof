import React, {useState, useEffect} from "react";
import {useRef} from "react";

import styled from "styled-components";
import Header from "../molecules/Header";
import PostList from "../organisms/PostList";
import NavLink from "../molecules/NavLink";
import {manualKerning} from "../../utils/helpers";
import {node} from "prop-types";

const Holder = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  z-index: 100;

  main {
    overflow-x: hidden;
    overflow-y: scroll;

    height: 100%;
  }
`;

const Main = styled.main`
  position: relative;
`;

const Heading = styled.h1`
  background-color: #c6c6c6;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 15px;
  @media (${props => props.theme.breakpoints.md}) {
    padding-bottom: 0;
  }
`;

function GlobalNav() {
  const nodeRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionIndex, setTransitionIndex] = useState(null);

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

  useEffect(() => {
    console.log(`isTransitioning: ${isTransitioning}`);
  }, [isTransitioning]);

  return (
    <Holder>
      <Main ref={nodeRef}>
        <Header />

        <Inner>
          <Heading>{manualKerning("Bear meets eagle on fire")}</Heading>

          {links.map((link, linkIndex) => (
            <NavLink
              key={link.id}
              link={link}
              index={linkIndex}
              isTransitioning={isTransitioning}
              setIsTransitioning={setIsTransitioning}
              transitionIndex={transitionIndex}
              setTransitionIndex={setTransitionIndex}
            />
          ))}

          <PostList />
        </Inner>
      </Main>
    </Holder>
  );
}

export default GlobalNav;

