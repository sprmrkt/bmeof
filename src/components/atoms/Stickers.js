import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import styled from "styled-components";
import Draggable from "react-draggable"; // The default
import { useWindowSize } from "react-use";
import { useState } from "react";

const Holder = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  z-index: 20;

  .react-draggable {
    height: 6rem;
    width: 6rem;
  }
`;

const Sticker = styled.div`
  cursor: pointer;
  z-index: 20;
  position: fixed;

  img {
    position: fixed;
    cursor: pointer;
    z-index: 20;
    height: 6rem;
    width: 6rem;
  }
`;
function Stickers({ data }) {
  const { height, width } = useWindowSize();
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const generateStickers = () => {
      const newStickers = data.stickers.nodes.map((sticker, i) => {
        // Generate a random yPos and xPos for each sticker
        const randomYPos = Math.floor(Math.random() * (height - 200 + 1));
        const randomXPos = Math.floor(Math.random() * (width - 100 + 1));

        return (
          <Draggable
            positionOffset={{
              x: randomXPos,
              y: randomYPos,
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
      });

      setStickers(newStickers);
    };

    generateStickers();
  }, [data.stickers.nodes, height, width]);

  return <Holder>{stickers}</Holder>;
}

export default Stickers;

