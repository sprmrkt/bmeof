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

  return (
    <div>
      {words.map((word, i) => (
        <React.Fragment key={i}>{word}</React.Fragment>
      ))}
    </div>
  );
};

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

