import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../../utils/store';

const Holder = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 5%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 999;
  pointer-events: none;
`;

const ButtonOverlay = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  pointer-events: all;
`;

const GlobalNavMoveRightButton = () => {
  const setHoverRight = useStore((state) => state.setHoverRight);

  const handleMouseOver = () => {
    setHoverRight(true);
  };

  const handleMouseOut = () => {
    setHoverRight(false);
  };

  return (
    <Holder>
      <ButtonOverlay
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <button
        style={{
          position: 'relative',
          zIndex: 1, // Ensure the button is on top of the overlay
        }}
      >
        
      </button>
    </Holder>
  );
};

export default GlobalNavMoveRightButton;
