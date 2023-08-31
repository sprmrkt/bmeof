import React from "react";

export const convertToSlug = (Text) => {
  return (
    "/" +
    Text.toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  );
};

export const manualKerning = (text) => {
  let elements = [];
  text.split("").forEach((letter) => {
    elements.push(
      <span className={`letter-${letter.toLowerCase()}`}>{letter}</span>
    );
  });
  return (
    <span className="manual-kerning">
      {elements.map((letter, i) => (
        <React.Fragment key={i}>{letter}</React.Fragment>
      ))}
    </span>
  );
};
