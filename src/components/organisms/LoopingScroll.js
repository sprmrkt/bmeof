import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from "../molecules/Header";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import {useWindowSize} from "react-use";
import PropTypes from "prop-types";
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";
import {manualKerning} from "../../utils/helpers";

const Holder = styled.div`
  display: none;
  @media ( ${props => props.theme.breakpoints.md} ) {
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
    if (!tl.current && fixedBody && size.width > 767) {
      tl.current = st.create({
        id: 'looping-scroll',
        trigger: holderRef.current,
        start: "top top",
        scroller: fixedBody.current,
        // markers: true,
        onEnter: () => {
            fixedBody.current.scrollTop = 0
        }
      });
      // console.log('doesnt exist, creating it');
    } else if (size.width > 767 && st.getById('looping-scroll')) {
      st.getById('looping-scroll').refresh();
      // console.log('exists desktop, so we are refeshing it');
    } else if( size.width < 768 && st.getById('looping-scroll')) {
      st.getById('looping-scroll').kill();
      tl.current = null;
      // console.log('exists mobile, so we are killing it and resetting tl ref');
    } else {
      // console.log('doesnt exist mobile');
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
          {manualKerning('Bear meets eagle on fire work studio hello')}
        </span>
        </span>
        </p>
      </div>
    </Holder>
  )
}

LoopingScroll.propTypes = {
  fixedBody: PropTypes.object,
};

export default LoopingScroll;