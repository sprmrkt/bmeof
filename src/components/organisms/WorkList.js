import React, {useRef} from 'react';
import styled from 'styled-components';
import WorkHolder from "../molecules/WorkHolder";
import PropTypes from 'prop-types';
import Spacer from "../atoms/Spacer";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media ( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
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
            node={node}
            even={i%2 === 1}/>)}
      </Grid>
      <Spacer/>
    </Holder>
  )
}

WorkList.propTypes = {
  parentUid: PropTypes.string,
  closeHandler: PropTypes.func,
  work: PropTypes.array.isRequired,
};

export default WorkList;