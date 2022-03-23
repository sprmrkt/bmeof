import React, {useRef} from 'react';
import styled from 'styled-components';
import WorkHolder from "../molecules/WorkHolder";
import PropTypes from 'prop-types';

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

const Spacer = styled.div`
  width: 100%;
  height: 60px;
`;

function WorkList(props) {
  const holderRef = useRef(null);
  return (
    <Holder ref={holderRef} id="work-content">
      <Grid>
        <WorkHolder {...props} parent={holderRef} />
        <WorkHolder {...props} parent={holderRef} even={true} />
        <WorkHolder {...props} parent={holderRef} />
        <WorkHolder {...props} parent={holderRef} even={true} />
      </Grid>
      <Spacer/>
    </Holder>
  )
}

WorkList.propTypes = {
  parentUid: PropTypes.string,
  closeHandler: PropTypes.func,
};

export default WorkList;