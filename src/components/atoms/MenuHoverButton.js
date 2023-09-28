import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../utils/store';

const Holder = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
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

const MenuHoverButton = () => {

  const hoverRight = useStore((state) => state.hoverRight);
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
        style={{
          backgroundColor: hoverRight ? 'rgba(0, 0, 0, 0.1)' : 'transparent', // Transparent background on hover
        }}
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

export default MenuHoverButton;
