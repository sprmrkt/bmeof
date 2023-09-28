import React, { useState, useEffect, useRef } from "react";
import Player from "@vimeo/player";
import styled from "styled-components";
import { useWindowSize } from "react-use";

// import { formatTime } from "../../utils/helpers";

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & > .iframe-holder {
    width: 100%;
    height: 100%;

    & iframe {
      width: 100%;
      height: 100%;

      & * {
        width: 100%;
        height: 100%;
      }
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
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const rangeRef = useRef(null);

  const size = useWindowSize();

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  //   const [toolTipTime, setToolTipTime] = useState(`00:00`);

  const handleInput = (e) => {
    setProgress(e.target.value);
    const time = e.target.value * duration;
    setCurrentTime(time);

    playerRef.current.setCurrentTime(time);
  };

  useEffect(() => {
    if (!videoRef?.current) return;

    const iframe = videoRef.current.querySelector("iframe");
    playerRef.current = new Player(iframe);
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
    <Holder>
      <div
        ref={videoRef}
        class="iframe-holder"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <ProgressHolder>
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
    </Holder>
  );
}

export default VideoPlayer;

