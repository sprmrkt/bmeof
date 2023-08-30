import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  min-height: 100vh;

  .gatsby-image-wrapper {
    top: ${(props) => props.randomTopPercentage}%;
    left: ${(props) => props.randomLeftPercentage}%;
    position: fixed;
    z-index: 20;
    height: 4rem;
    width: 4rem;
  }
`;

function Stickers({ data }) {
  return (
    <Holder>
      {data.stickers.nodes.map((sticker, i) => {
        // Generate a random topPercentage and leftPercentage for each sticker
        const randomTopPercentage =
          Math.floor(Math.random() * (90 - 10 + 1)) + 10;
        const randomLeftPercentage =
          Math.floor(Math.random() * (90 - 10 + 1)) + 10;

        return (
          <div key={i} top={randomTopPercentage} left={randomLeftPercentage}>
            <GatsbyImage
              image={sticker.data.image.gatsbyImageData}
              alt={sticker.data.image.alt || "sticker"}
            />
          </div>
        );
      })}
    </Holder>
  );
}

export default Stickers;

