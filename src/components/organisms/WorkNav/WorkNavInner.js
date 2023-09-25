import React, {useState, useEffect, useRef} from "react";
import {useLocation} from "@reach/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkNavLink from "./WorkNavLink";

import {useStore} from "../../../utils/store";
import WorkNavLinkHolder from "./WorkNavLinkHolder";

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

function WorkNavInner({works}) {
  // ref
  const holderRef = useRef(null);

  // state
  const { workNavSplitIndex, setWorkNavSplitIndex } = useStore();
  const { workNavUpPosition, setWorkNavUpPosition } = useStore();
  const { workNavDownPosition, setWorkNavDownPosition } = useStore();

  return (
    <Holder ref={holderRef}>
      <Grid>
        {works?.map((work, i) => (
          <WorkNavLinkHolder
            index={i}
            title={work.data.title.text}
            position={
              i <= workNavSplitIndex || (i % 2 === 1 && i - 1 === workNavSplitIndex)
                ? workNavUpPosition
                : workNavDownPosition
            }>
            <WorkNavLink
              work={work}
              even={i % 2 === 0}
              index={i}
            />
          </WorkNavLinkHolder>
        ))}
      </Grid>
    </Holder>
  );
}

WorkNavInner.propTypes = {
  works: PropTypes.array.isRequired,
};

export default WorkNavInner;

