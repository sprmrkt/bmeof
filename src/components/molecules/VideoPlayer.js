import React, { useState, useEffect, useRef } from "react";
import Player from "@vimeo/player";
import styled from "styled-components";
import { useWindowSize } from "react-use";

import { useStore } from "../../utils/store";
// import { formatTime } from "../../utils/helpers";

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  cursor: ${(props) => (props.controls ? "inherit" : "none !important")};

  & .iframe-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    & .iframe-holder {
      width: 100%;
      height: 100%;

      pointer-events: none;
      user-select: none;

      & iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Controls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  inset: 0;
  width: 100%;
  height: 100%;

  box-shadow: 0 0 200px rgba(0,0,0,0.9) inset;

  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const CloseButton = styled.button`
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
`;

const ProgressHolder = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  height: auto;
  padding: 0 24px;

  display: flex;
  align-items: center;

  progress {
    width: 100%;
    height: 12px;
    border-radius: 999px;
    border: none;
    pointer-events: none;

    &[value] {
      -webkit-appearance: none;
      appearance: none;
      background-color: rgba(255, 255, 255, 0.3);

      &::-moz-progress-bar {
        background-color: white;
        border-radius: 999px;
      }

      &::-webkit-progress-bar {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 999px;
      }
      &::-webkit-progress-value {
        background-color: white;
        border-radius: 999px;
      }
    }
  }

  .seek-tooltip {
    width: max-content;
    position: absolute;
    top: -2rem;
    color: white;
  }
`;

const RangeHolder = styled.div`
  position: absolute;
  width: calc(100% - 48px);
  height: 12px;
  top: 0;
  margin: 0;
  padding: 0;

  &:hover {
    #range-icon-holder {
      opacity: 1;

        .range-icon {
            transform: scale(1.5);
        }
    }
  }

    .seek {
        position: relative;
        width: 100%;
        height: 100%;
        border: none;
        cursor: pointer;
        margin: 0;
        padding: 0;
        opacity: 0;

        &:focus,
        &:active {
            outline: none;
            border: none;
        }
    }

    #range-icon-holder {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      
      transition: opacity 0.3s ease-in-out;

      .range-icon {
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 999px;

        transition: transform 0.3s ease-in-out;
      }
    }
  }
`;

function VideoPlayer({ content }) {
  const mouseTimer = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const rangeRef = useRef(null);

  const size = useWindowSize();
  const setEmbedIsOpen = useStore((state) => state.setEmbedIsOpen);
  const setEmbedContent = useStore((state) => state.setEmbedContent);

  const [controlsVisible, setControlsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  //   const [toolTipTime, setToolTipTime] = useState(`00:00`);

  const handleInput = (e) => {
    setProgress(e.target.value);
    const time = e.target.value * duration;
    setCurrentTime(time);

    playerRef.current.setCurrentTime(time);
  };

  const hideControls = () => {
    setControlsVisible(false);
  };

  const handleControlsVisible = (e) => {
    setControlsVisible(true);
    clearTimeout(mouseTimer.current);

    mouseTimer.current = setTimeout(hideControls, 1000);
  };

  const pauseVideo = () => {
    playerRef.current.pause();
  };

  const playVideo = () => {
    playerRef.current.play();
  };

  const handlePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  useEffect(() => {
    if (!videoRef?.current) return;

    const iframe = videoRef.current.querySelector("iframe");
    playerRef.current = new Player(iframe, {
      controls: false,
      autoplay: true,
      muted: false,
      loop: true,
    });
  }, [content, videoRef.current]);

  useEffect(() => {
    if (!playerRef?.current) return;

    playerRef.current.getDuration().then((duration) => {
      setDuration(Math.round(duration));
    });

    playerRef.current.on(`timeupdate`, ({ percent, seconds }) => {
      setCurrentTime(seconds);
      setProgress(percent);
    });

    playerRef.current.on(`play`, () => {
      setIsPlaying(true);
    });

    playerRef.current.on(`playing`, () => {
      setIsPlaying(true);
    });

    playerRef.current.on(`pause`, () => {
      setIsPlaying(false);
    });

    playerRef.current.on(`ended`, () => {
      setIsPlaying(false);
    });
  }, [playerRef, size]);

  useEffect(() => {
    if (!rangeRef?.current) return;

    const rangeIcon = rangeRef.current.querySelector("#range-icon-holder");
    const translateX = rangeRef.current.offsetWidth * progress - 6;
    rangeIcon.style.transform = `translateX(${translateX}px)`;
  }, [progress, rangeRef.current]);

  //   useEffect(() => {
  //     const { minutes, seconds } = formatTime(currentTime);

  //     setToolTipTime(`${minutes}:${seconds}`);
  //   }, [currentTime]);

  return (
    <Holder onMouseMove={handleControlsVisible} controls={controlsVisible}>
      <div class="iframe-wrapper" onClick={handlePlay}>
        <div
          ref={videoRef}
          class="iframe-holder"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <Controls active={controlsVisible}>
        <CloseButton
          onClick={() => {
            setEmbedContent(null);
            setEmbedIsOpen(false);
          }}>
          <div className="cross">
            <div></div>
            <div></div>
          </div>
        </CloseButton>

        <ProgressHolder id="progress-holder">
          <RangeHolder ref={rangeRef}>
            <div id="range-icon-holder">
              <div class="range-icon" />
            </div>

            <input
              class="seek"
              value={progress}
              min="0"
              max="1"
              type="range"
              step="0.001"
              onInput={handleInput}
            />
          </RangeHolder>

          <progress
            class="progress-bar"
            value={currentTime}
            min="0"
            max={duration}></progress>

          {/* <div class="seek-tooltip" id="seek-tooltip">
            {toolTipTime}
          </div> */}
        </ProgressHolder>
      </Controls>
    </Holder>
  );
}

export default VideoPlayer;

