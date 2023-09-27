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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  transform-origin: bottom left;
  font-family: "Gotham", "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? "auto" : "none")};

  transition: opacity 0.3s ease-in-out;

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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  z-index: 10;
  color: white;
  mix-blend-mode: difference;
`;

function EmbedOverlay() {
  const { embedIsOpen, setEmbedIsOpen, embedContent, setEmbedContent } =
    useStore((state) => state);

  return (
    <OverlayHolder active={embedIsOpen}>
      <Title>
        <button
          className="close"
          onClick={() => {
            setEmbedContent(null);
            setEmbedIsOpen(false);
          }}>
          <p className="exit-text">Exit full screen</p>
          <p className="cross">+</p>
        </button>
      </Title>

      {embedContent && (
        <div dangerouslySetInnerHTML={{ __html: embedContent }} />
      )}
    </OverlayHolder>
  );
}

export default EmbedOverlay;

