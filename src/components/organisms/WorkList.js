import React, {useRef} from 'react';
import styled from 'styled-components';
import WorkHolder from "../molecules/WorkHolder";
import PropTypes from 'prop-types';

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  padding: 1rem;
  @media ( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
`;

function WorkList(props) {
  const holderRef = useRef(null);
  return (
    <Holder ref={holderRef} id="work-content">
      <WorkHolder {...props} parent={holderRef}/>
      <WorkHolder {...props} parent={holderRef} even={true}/>
      <WorkHolder {...props} parent={holderRef}/>
      <WorkHolder {...props} parent={holderRef} even={true}/>
    </Holder>
  )
}

WorkList.propTypes = {
  parentUid: PropTypes.string,
  parentButtonHeight: PropTypes.number,
};

export default WorkList;