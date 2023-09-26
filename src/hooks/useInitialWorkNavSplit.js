import {useStore} from "../utils/store";
import {useEffect} from "react";

export default function useInitialWorkNavSplit(workNavRef, id, index) {
  const {
    workNavSplitIndex,
    setWorkNavSplitIndex,
    setWorkNavUpPosition,
    setWorkNavDownPosition,
    workNavSplitHappenedOnce,
    setWorkNavSplitHappenedOnce,
  } = useStore();


  useEffect(() => {
    // 1. Check if we have landed directly on the work page
    const el = workNavRef?.current;
    if (el && workNavSplitIndex === null && !workNavSplitHappenedOnce) {
      // 1. Scroll global nav to work link
      const {top, height} = el.querySelector(`#work-${id}`).getBoundingClientRect();
      el.scrollTo(0, top + el.scrollTop);
      // 2. Wait until the scroll (above) has definitely happened then...
      const split = setTimeout(() => {
        // 3. Calculate translate distance for nav up and down
        const windowHeight = window?.innerHeight;
        let up = -(height - 48);
        const down = windowHeight - 48;
        // 4. Set nav split index to work link
        // 5. Set nav up and down position
        setWorkNavSplitIndex(index);
        setWorkNavUpPosition(up);
        setWorkNavDownPosition(down);
        // 6. Set happenedOnce to true
        setWorkNavSplitHappenedOnce(true);
      }, 500);
      // 7. Clear timeout
      return () => clearTimeout(split);
    }
  }, [index, workNavSplitIndex, workNavSplitHappenedOnce, workNavRef, setWorkNavSplitIndex, setWorkNavUpPosition, setWorkNavDownPosition, setWorkNavSplitHappenedOnce, id]);

  return null;
};