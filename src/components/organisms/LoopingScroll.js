import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from "../molecules/Header";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import {useWindowSize} from "react-use";

const Holder = styled.div`
  display: none;
  @media( ${props => props.theme.breakpoints.md} ) {
    display: block;
  }
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
  const size = useWindowSize();

  useEffect(() => {
    if(size.width > 575) {
      if (!tl.current) {
        tl.current = st.create({
          trigger: holderRef.current,
          start: "top top",
          onEnter: () => {
            window.scrollTo(0, 0);
          }
        });
      }
    } else {
      if (tl.current) {
        tl.current.kill()
        tl.current = null
      }
    }

  }, [size, tl, holderRef, st])

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