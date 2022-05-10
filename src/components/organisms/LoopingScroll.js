import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useOnScreen} from "../../hooks/useOnScreen";
import Header from "../molecules/Header";
import useScrollTrigger from "../../hooks/useScrollTrigger";

const Holder = styled.div`
  .inner {
    position: relative;
    width: 100%;
    height: 150vh;
    overflow: hidden;
  }

  .trigger {
    position: absolute;
    left: 0;
    top: calc(100vh - 2px);
    width: 100%;
    height: 1px;
  }
`;

function LoopingScroll() {
  const {tl, holderRef, gsap, st, q} = useScrollTrigger();

  useEffect(() => {
    if (!tl.current) {
      tl.current = st.create({
        trigger: holderRef.current,
        start: "top top",
        onEnter: () => {
          window.scrollTo(0, 0);
        }
      });
    }
  })

  return (
    <Holder ref={holderRef}>
      <div className="inner">
        <Header />
        <p className="h1">
        <span className="large-text-wrapper">
        Bear<br />
        Meets<br />
        Eagle<br />
        On<br />
        Fire<br />
        Think<br />
        Make<br />
        Studio<br />
        </span>
        </p>
      </div>
    </Holder>
  )
}

export default LoopingScroll;