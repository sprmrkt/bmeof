import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useOnScreen} from "../../hooks/useOnScreen";
import Header from "../molecules/Header";

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
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      window.scrollTo(0, 0);
    }
  }, [isOnScreen]);

  useEffect(() => {

  }, []);

  return (
    <Holder>
      <div className="inner">
        <Header/>
        <p className="h1">
        <span className="large-text-wrapper">
        Bear<br />
        Meets<br />
        Eagle<br />
        On<br />
        Fire<br />
        </span>
        </p>
        <div ref={elementRef} className="trigger" />
        <p className="h1">
        <span className="large-text-wrapper">
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