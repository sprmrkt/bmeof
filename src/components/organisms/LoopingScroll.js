import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from "../molecules/Header";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import {useWindowSize} from "react-use";
import PropTypes from "prop-types";
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";
import {manualKerning} from "../../utils/helpers";
import {useStore} from "../../utils/store";

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

  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
    }
  }
`;

function LoopingScroll({fixedBody}) {
  const {tl, holderRef, st, gsap} = useScrollTrigger();
  const size = useWindowSize();
  const accordionIsOpen = useStore(state => state.accordionIsOpen);

  useEffect(() => {

    if (!tl.current && fixedBody) {
      st.config({
        ignoreMobileResize: true
      })
      let mm = gsap.matchMedia();
      tl.current = mm.add("(min-width: 768px)", () => {

        // this setup code only runs when viewport is at least 800px wide
        st.create({
          id: 'looping-scroll',
          trigger: holderRef.current,
          start: "top top",
          scroller: fixedBody.current,
          // markers: true,
          onEnter: () => {
            // console.log(fixedBody.current.scrollTop)
            fixedBody.current.scrollTop = 0
            // console.log('triggered enter')
            // console.log(fixedBody.current.scrollTop)
          },
          onLeave: () => {
            // console.log(fixedBody.current.scrollTop)
            fixedBody.current.scrollTop = 0
            // console.log('triggered end')
            // console.log(fixedBody.current.scrollTop)
          }
        });

        return () => { // optional
          // custom cleanup code here (runs when it STOPS matching)
        };
      });
      // console.log('doesnt exist, creating it');
    } else if (st.getById('looping-scroll')) {
      st.getById('looping-scroll').refresh();
      // console.log('exists, so we are refreshing it');
    }

  }, [size, tl, holderRef, st, fixedBody, gsap])


  useEffect(() => {
    if (!accordionIsOpen) {
      const myRefresh = setTimeout(() => {
        if (st.getById('looping-scroll')) { st.getById('looping-scroll').refresh() }
        console.log('refreshed after close')
      }, 1500);
      return () => clearTimeout(myRefresh);
    }
  }, [accordionIsOpen, st]);

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
      <div className="end"/>
    </Holder>
  )
}

LoopingScroll.propTypes = {
  fixedBody: PropTypes.object,
};

export default LoopingScroll;