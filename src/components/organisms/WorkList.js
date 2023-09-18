import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorkTile from "../molecules/WorkTile";

const Holder = styled.div`
  height: 100%;
  -webkit-overflow-scrolling: touch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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

function WorkList({work}) {
  return (
    <Holder>
      <Grid>
        {work.map((node, i) => (
          <WorkTile work={node.work_item.document} even={i % 2 === 1} />
        ))}
        {work.length % 2 === 1 && <SpareTileBorder />}
      </Grid>
    </Holder>
  );
}

WorkList.propTypes = {
  work: PropTypes.array.isRequired,
};

export default WorkList;

