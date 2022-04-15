import React, {useRef} from 'react';
import styled from 'styled-components';
import WorkHolder from "../molecules/WorkHolder";
import PropTypes from 'prop-types';
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;
  @supports (-moz-appearance: none) {
    /*
      Disable in FF due to https://bugzilla.mozilla.org/show_bug.cgi?id=1744289
      using @supports https://stackoverflow.com/a/32455002
    */
    scroll-snap-type: none !important;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media ( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
  
`;

const SpareTileBorder = styled.div`
  align-self: end;
  border-bottom: 1px solid;
  display: none;
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: block;
  }
`;

function WorkList(props) {
  const holderRef = useRef(null);
  return (
    <Holder ref={holderRef} id="work-content">
      <Grid>
        {props.work.map((node, i) =>
          <WorkHolder
            key={i}
            {...props}
            parent={holderRef}
            node={node.work_item.document}
            even={i%2 === 1}/>)}
        {props.work.length % 2 === 1 && <SpareTileBorder/>}
      </Grid>
      <CloseButton closeHandler={props.closeHandler} border={false}/>
    </Holder>
  )
}

WorkList.propTypes = {
  parentUid: PropTypes.string,
  closeHandler: PropTypes.func,
  work: PropTypes.array.isRequired,
};

export default WorkList;