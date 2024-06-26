import React from "react";

export const convertToSlug = Text => {
  return (
    "/" +
    Text.toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  );
};

export const manualKerning = text => {
  const words = text.split(" ").map(word => {
    const letters = word.split("").map((letter, i) => {
      return (
        <span key={i} className={`letter letter-${letter.toLowerCase()}`}>
          {letter}
        </span>
      );
    });

    return (
      <span key={word} className="manual-kerning">
        {letters}
      </span>
    );
  });

  return words.map((word, i) => (
    <React.Fragment key={i}>{word}</React.Fragment>
  ));
};

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  return {
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds
  };
}