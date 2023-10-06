import React from "react";
import styled from "styled-components";

import VideoPlayer from "../molecules/VideoPlayer";
import { useStore } from "../../utils/store";

const OverlayHolder = styled.div`
  position: fixed;
  z-index: 1000;
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
`;

function EmbedOverlay() {
  const embedIsOpen = useStore((state) => state.embedIsOpen);
  const embedContent = useStore((state) => state.embedContent);

  return (
    <OverlayHolder id="embed-overlay" active={embedIsOpen}>
      {embedContent && <VideoPlayer content={embedContent} />}
    </OverlayHolder>
  );
}

export default EmbedOverlay;

