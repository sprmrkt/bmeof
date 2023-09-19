import React, {useState, useEffect} from "react";
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
  const {workActive} = useStore();

  const [transitionIndex, setTransitionIndex] = useState(null);
  const [translateUp, setTranslateUp] = useState(0);
  const [translateDown, setTranslateDown] = useState(0);

  useEffect(() => {
    if (!workActive) return;

    setTransitionIndex(null);
    setTranslateUp(0);
    setTranslateDown(0);
  }, [workActive]);

  return (
    <Holder>
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

