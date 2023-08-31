import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable"; // The default
import { useWindowSize } from "react-use";

const Holder = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  min-height: 100vh;

  .react-draggable {
    height: 4rem;
    width: 4rem;
  }
`;

const Sticker = styled.div`
  cursor: pointer;
  z-index: 20;

  img {
    position: fixed;
    cursor: pointer;
    z-index: 20;
    height: 4rem;
    width: 4rem;
  }
`;

function Stickers({ data }) {
  const { height, width } = useWindowSize();
  return (
    <Holder>
      {data.stickers.nodes.map((sticker, i) => {
        // Generate a random topPercentage and leftPercentage for each sticker
        const randomTopPercentage =
          Math.floor(Math.random() * (height - 50 + 1)) + height;
        const randomLeftPercentage =
          Math.floor(Math.random() * (width - 50 + 1)) + height;

        return (
          <Draggable
            positionOffset={{
              x: randomTopPercentage,
              y: randomLeftPercentage,
            }}
            key={i}
          >
            <Sticker>
              <GatsbyImage
                image={sticker.data.image.gatsbyImageData}
                alt={sticker.data.image.alt || "sticker"}
              />
            </Sticker>
          </Draggable>
        );
      })}
    </Holder>
  );
}

export default Stickers;

