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

  color: #333;
  background-color: #000;

  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;

  transform-origin: bottom left;
  font-family: "Gotham", "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  .close {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
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

      width: 24px;
      height: 24px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


      & > div {
        width: 100%;
        height: 2px;
        background-color: #fff;

        &:nth-child(1) {
          transform-origin: center center;
          transform: translateY(1px) rotate(45deg);
        }

        &:nth-child(2) {
          transform-origin: center center;
          transform: translateY(-1px) rotate(-45deg);
        }
      }

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
    height: 100%
  }
`;

function EmbedOverlay() {
  const embedIsOpen = useStore((state) => state.embedIsOpen);
  const setEmbedIsOpen = useStore((state) => state.setEmbedIsOpen);
  const embedContent = useStore((state) => state.embedContent);
  const setEmbedContent = useStore((state) => state.setEmbedContent);

  return (
    <OverlayHolder active={embedIsOpen}>
      <button
        className="close"
        onClick={() => {
          setEmbedContent(null);
          setEmbedIsOpen(false);
        }}
      >
        <div className="cross">
          <div></div>
          <div></div>
        </div>
      </button>

      {embedContent && (
        <div dangerouslySetInnerHTML={{ __html: embedContent }} />
      )}
    </OverlayHolder>
  );
}

export default EmbedOverlay;

