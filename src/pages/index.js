import React, {useEffect} from "react";
import styled from "styled-components";

import Seo from "../components/molecules/Seo";
import Sticker from "../components/atoms/Sticker";

import {useStore} from "../utils/store";
import spriteSheet3 from "../assets/img/spritesheet_3.png";

const frameWidth = 320;
const totalFrames = 30;
const fps = 15;

const SpriteSheet = styled(Sticker)`
  width: ${frameWidth}px;
  height: ${frameWidth}px;

  object-fit: cover;
  object-position: 0px 0px;

  animation: sprite ${totalFrames / fps}s steps(${totalFrames}) infinite;

  @keyframes sprite {
    from {
      object-position: 0px 0px;
    }
    to {
      object-position: -${frameWidth * totalFrames}px 0px;
    }
`;

function IndexPage() {
  // state
  const {setNavActive} = useStore();

  // lifecycle
  useEffect(() => {
    setNavActive(true);
  }, []);

  return (
    <>
      <Seo title="Home" />
      <SpriteSheet src={spriteSheet3} />
    </>
  );
}

export default IndexPage;

