import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from "../molecules/Header";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import {useWindowSize} from "react-use";
import PropTypes from "prop-types";
import LockScroll from "../atoms/LockScroll";
import {useStore} from "../../utils/store";
import classNames from "classnames";
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";

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

  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
    }
  }
`;

function LoopingScroll({fixedBody}) {
  const {tl, holderRef, st} = useScrollTrigger();
  const size = useWindowSize();

  useEffect(() => {
    if (!tl.current && fixedBody) {
      tl.current = st.create({
        trigger: holderRef.current,
        start: "top top",
        scroller: fixedBody.current,
        // markers: true,
        onEnter: () => {
          // console.log('scroll-enter-start', fixedBody.current.scrollTop, fixedBody.current.style.overflow)
          if (size.width < 575) {
            setTimeout(() => fixedBody.current.scrollTop = 0, 1);
          } else {
            fixedBody.current.scrollTop = 0
          }
          // console.log('scroll-enter-end', fixedBody.current.scrollTop, fixedBody.current.style.overflow)
        }
      });
    } else {
      st.refresh()
    }

  }, [size, tl, holderRef, st, fixedBody])

  return (
    <Holder
      ref={holderRef}>
      <div className="inner">
        <Header />
        <p className="h1">
        <span className={`large-text-outer ${useHorizontalHoverClassname()}`}>
        <span className="large-text-wrapper">
        Bear<br />
        Meets<br />
        Eagle<br />
        On<br />
        Fire<br />
        Work<br />
        Studio<br />
        Hello<br />
        </span>
        </span>
        </p>
      </div>
    </Holder>
  )
}

LockScroll.propTypes = {
  fixedBody: PropTypes.object,
};

export default LoopingScroll;