import React, {useRef} from 'react';
import styled from 'styled-components';
import {useMouse} from "react-use";
import {useStore} from "../../utils/store";

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  pointer-events: none;
`;

const Cursor = styled.div.attrs(props => ({
  style: {
    transform: `translate( ${props.x}px, ${props.y}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  @media ( ${props => props.theme.breakpoints.md} ) {
    opacity: ${props => props.$customCursorIsVisible ? 1 : 0};
  }
`;

const Text = styled.div`
  color: #ffff00;
  pointer-events: none;
  text-transform: uppercase;
  font-size: 40px;
  transform: translateY(-50%);
`;

function CustomCursor() {
  const ref = useRef(null);
  const {elX, elY} = useMouse(ref);
  const customCursorIsVisible = useStore(state => state.customCursorIsVisible);
  const customCursorContent = useStore(state => state.customCursorContent);

  return (
    <Holder ref={ref}>
      <Cursor x={elX} y={elY} $customCursorIsVisible={customCursorIsVisible}>
        {customCursorContent && <Text>{customCursorContent}</Text>}
      </Cursor>
    </Holder>
  )
}

export default CustomCursor;