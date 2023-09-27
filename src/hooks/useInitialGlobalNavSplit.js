import { useStore } from "../utils/store";
import { useEffect } from "react";

export default function useInitialGlobalNavSplit(
  navRef,
  id,
  index,
  individualWorkPage = false
) {
  const {
    navSplitIndex,
    setNavSplitIndex,
    setNavUpPosition,
    setNavDownPosition,
    globalNavSplitHappenedOnce,
    setGlobalNavSplitHappenedOnce,
  } = useStore();

  useEffect(() => {
    // 1. Check if we have landed directly on the work, studio, hello, or store page
    const el = navRef?.current;
    if (!el || navSplitIndex !== null || globalNavSplitHappenedOnce) return;

    // 2. Scroll global nav to work link
    const workLink = el.querySelector(`#${id}`);

    const { top } = workLink.getBoundingClientRect();
    el.scrollTo(0, top + el.scrollTop);

    // 3. Wait until the scroll (above) has definitely happened then...
    const split = setTimeout(() => {
      // 4. Calculate translate distance for nav up and down
      const { top: newTop, bottom, height } = workLink.getBoundingClientRect();
      const windowHeight = window?.innerHeight;
      let up = -(bottom - 48);
      if (individualWorkPage) up -= 48;
      const down = windowHeight - newTop - height;

      // 5. Set nav split index to work link
      setNavSplitIndex(index);

      // 6. Set nav up and down position
      setNavUpPosition(up);
      setNavDownPosition(down);

      // 7. Set happenedOnce to true
      setGlobalNavSplitHappenedOnce(true);
    }, 0);

    // 8. Clear timeout
    return () => clearTimeout(split);
  }, [
    index,
    navSplitIndex,
    globalNavSplitHappenedOnce,
    navRef,
    setNavSplitIndex,
    setNavUpPosition,
    setNavDownPosition,
    setGlobalNavSplitHappenedOnce,
    id,
    individualWorkPage,
  ]);

  return null;
}

