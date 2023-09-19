import React, {useState, useEffect, useRef} from "react";
import {useLocation} from "@reach/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkTile from "../molecules/WorkTile";

import {useStore} from "../../utils/store";

const Holder = styled.div`
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 48px;

  @media (${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
  .workTileHolder:first-child,
  .workTileHolder:nth-child(2) {
    .workTile {
      border-top: none;
    }
  }
`;

const SpareTileBorder = styled.div`
  border-top: 1px solid;
  display: none;
  @media (${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const TranslateWrapper = styled.div`
  position: relative;
  width: 100%;
  display: block;

  transition: transform 300ms linear;
  transform: translateY(${({distance}) => `${distance}px` || "0"});
`;

function WorkList({works}) {
  // ref
  const holderRef = useRef(null);

  //store
  const {workActive} = useStore();

  // state
  const location = useLocation();
  const [transitionIndex, setTransitionIndex] = useState(null);
  const [translateUp, setTranslateUp] = useState(0);
  const [translateDown, setTranslateDown] = useState(0);

  // lifecycle
  useEffect(() => {
    const el = holderRef?.current;
    if (
      !el ||
      location.pathname === "/work/" ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    )
      return;

    const currentWork = works.find(work =>
      location.pathname.includes(work.uid)
    );

    const currentWorkIndex = works.findIndex(
      work => work.uid === currentWork.uid
    );
    setTransitionIndex(currentWorkIndex);

    const currentEl = document?.querySelector(`[data-id="${currentWork.id}"]`);

    const {top, bottom, height} = currentEl?.getBoundingClientRect();

    el.scrollTo(0, top);

    const windowHeight = window?.innerHeight;
    const up = -bottom + 48;
    const down = windowHeight - top;

    setTranslateUp(up);
    setTranslateDown(down);
  }, [holderRef]);

  useEffect(() => {
    if (!workActive) return;

    setTransitionIndex(null);
    setTranslateUp(0);
    setTranslateDown(0);
  }, [workActive]);

  return (
    <Holder ref={holderRef}>
      <Grid>
        {works?.map((work, i) => (
          <TranslateWrapper
            distance={
              i <= transitionIndex || (i % 2 === 1 && i - 1 === transitionIndex)
                ? translateUp
                : translateDown
            }>
            <WorkTile
              work={work}
              even={i % 2 === 0}
              index={i}
              setTransitionIndex={setTransitionIndex}
              setTranslateUp={setTranslateUp}
              setTranslateDown={setTranslateDown}
            />
          </TranslateWrapper>
        ))}
        {works.length % 2 === 1 && <SpareTileBorder />}
      </Grid>
    </Holder>
  );
}

WorkList.propTypes = {
  works: PropTypes.array.isRequired,
};

export default WorkList;

