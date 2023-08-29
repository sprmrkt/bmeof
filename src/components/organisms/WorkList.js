import React, { useRef } from "react";
import styled from "styled-components";
import WorkHolder from "../molecules/WorkHolder";
import PropTypes from "prop-types";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .close-button {
    border-top: 1px solid;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
`;

const SpareTileBorder = styled.div`
  border-top: 1px solid;
  display: none;
  @media (${(props) => props.theme.breakpoints.md}) {
    display: block;
  }
`;

function WorkList(props) {
  const holderRef = useRef(null);
  console.log("props", props.work);
  return (
    <Holder ref={holderRef} id="work-content">
      <Grid>
        {props.work.map((node, i) => (
          <WorkHolder
            key={i}
            {...props}
            parent={holderRef}
            node={node.work_item.document}
            even={i % 2 === 1}
            uid={`/work/${node.work_item.document.id}`}
          />
        ))}
        {props.work.length % 2 === 1 && <SpareTileBorder />}
      </Grid>
      <CloseButton closeHandler={props.closeHandler} border={false} />
    </Holder>
  );
}

WorkList.propTypes = {
  parentUid: PropTypes.string,
  closeHandler: PropTypes.func,
  work: PropTypes.array.isRequired,
};

export default WorkList;

