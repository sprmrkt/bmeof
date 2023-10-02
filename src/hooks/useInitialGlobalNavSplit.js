import {useStore} from "../utils/store";
import {useEffect} from "react";

export default function useInitialGlobalNavSplit(navRef, id, index, individualWorkPage = false) {
  const {
    navSplitIndex,
    setNavSplitIndex,
    setNavUpPosition,
    setNavDownPosition,
    globalNavSplitHappenedOnce,
    setGlobalNavSplitHappenedOnce,
  } = useStore();


  useEffect(() => {
    const el = navRef?.current;
    if (el && navSplitIndex === null && !globalNavSplitHappenedOnce) {
      // 1. Scroll global nav to work link
      const navLink = el.querySelector(`#${id}`);
      const {top, height} = navLink.getBoundingClientRect();
      el.scrollTo(0, top + el.scrollTop);
      // 2. Wait until the scroll (above) has definitely happened then...
      const split = setTimeout(() => {
        // 3. Calculate translate distance for nav up and down
        const { top: newTop, bottom, height } = navLink.getBoundingClientRect();
        const windowHeight = window?.innerHeight;
        let up = -(bottom - 48);
        if (individualWorkPage) up -= 48;
        const down = windowHeight - newTop - height;
        // 4. Set nav split index to work link
        // 5. Set nav up and down position
        setNavSplitIndex(index);
        setNavUpPosition(up);
        setNavDownPosition(down);
        // 6. Set happenedOnce to true
        setGlobalNavSplitHappenedOnce(true);
      }, 500);
      // 7. Clear timeout
      return () => clearTimeout(split);
    }
  }, [index, navSplitIndex, globalNavSplitHappenedOnce, navRef, setNavSplitIndex, setNavUpPosition, setNavDownPosition, setGlobalNavSplitHappenedOnce, id, individualWorkPage]);

  return null;
};