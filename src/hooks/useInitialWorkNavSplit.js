import { useStore } from "../utils/store";
import { useEffect } from "react";

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
    if (!el || workNavSplitIndex !== null || workNavSplitHappenedOnce) return;

    // 2. Scroll global nav to work link
    const workLink = el.querySelector(`#work-${id}`);

    const { top } = workLink.getBoundingClientRect();
    el.scrollTo(0, top + el.scrollTop);

    // 3. Wait until the scroll (above) has definitely happened then...
    const split = setTimeout(() => {
      // 4. Calculate translate distance for nav up and down
      const { top: newTop, bottom, height } = workLink.getBoundingClientRect();
      const windowHeight = window?.innerHeight;
      let up = -(bottom - 48);
      const down = windowHeight - newTop - height;

      // 5. Set nav split index to work link
      setWorkNavSplitIndex(index);

      // 6. Set nav up and down position
      setWorkNavUpPosition(up);
      setWorkNavDownPosition(down);

      // 7. Set happenedOnce to true
      setWorkNavSplitHappenedOnce(true);
    }, 0);

    // 7. Clear timeout
    return () => clearTimeout(split);
  }, [
    index,
    workNavSplitIndex,
    workNavSplitHappenedOnce,
    workNavRef,
    setWorkNavSplitIndex,
    setWorkNavUpPosition,
    setWorkNavDownPosition,
    setWorkNavSplitHappenedOnce,
    id,
  ]);

  return null;
}

