import React from "react";
import styled from "styled-components";
import { useStore } from "../../utils/store";

const OverlayHolder = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  color: #333;
  background-color: #000;
  transform-origin: bottom left;
  font-family: "Gotham", "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  .close {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-transform: uppercase;

    .exit-text,
    .cross {
      margin: 0;
      position: absolute;
      top: ${(48 - 15) / 2}px;
      left: 15px;
      @media (${(props) => props.theme.breakpoints.md}) {
        left: 24px;
      }
    }

    .cross {
      left: auto;
      right: 15px;
      transform: rotate(45deg);
      @media (${(props) => props.theme.breakpoints.md}) {
        left: auto;
        right: 24px;
      }
    }
  }

  iframe,
  object,
  embed {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: calc(var(--windowHeight) - 96px);
    transform: translate(-50%, -50%);
  }
`;

function EmbedOverlay() {
  const embedIsOpen = useStore((state) => state.embedIsOpen);
  const setEmbedIsOpen = useStore((state) => state.setEmbedIsOpen);
  const embedContent = useStore((state) => state.embedContent);
  const setEmbedContent = useStore((state) => state.setEmbedContent);

  if (!embedContent) return null;

  return (
    <OverlayHolder>
      <button
        className="close"
        onClick={() => {
          setEmbedContent(null);
          setEmbedIsOpen(false);
        }}
      >
        <p className="exit-text">Exit full screen</p>
        <p className="cross">+</p>
      </button>
      <div dangerouslySetInnerHTML={{ __html: embedContent }} />
    </OverlayHolder>
  );
}

export default EmbedOverlay;

