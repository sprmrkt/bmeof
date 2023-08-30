import { useState, useEffect } from "react";

export function useRandomPercentages() {
  const [usedPercentages, setUsedPercentages] = useState([]);
  const [topPercentage, setTopPercentage] = useState(null);
  const [leftPercentage, setLeftPercentage] = useState(null);

  // Generate a random percentage that hasn't been used yet
  useEffect(() => {
    if (usedPercentages.length < 81) {
      // Ensure we don't run out of unique percentages
      let randomTopPercentage, randomLeftPercentage;

      // Generate a random topPercentage
      do {
        randomTopPercentage = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
      } while (usedPercentages.includes(randomTopPercentage));

      // Generate a random leftPercentage
      do {
        randomLeftPercentage = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
      } while (usedPercentages.includes(randomLeftPercentage));

      // Add the generated percentages to the list of used percentages
      setUsedPercentages([
        ...usedPercentages,
        randomTopPercentage,
        randomLeftPercentage,
      ]);

      // Set the topPercentage and leftPercentage
      setTopPercentage(randomTopPercentage);
      setLeftPercentage(randomLeftPercentage);
    }
  }, []);
  return [topPercentage, leftPercentage];
}

