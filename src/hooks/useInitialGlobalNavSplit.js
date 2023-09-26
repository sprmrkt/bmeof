import {useStore} from "../utils/store";
import {useEffect} from "react";

export default function useInitialGlobalNavSplit(navRef, id, index) {
  const {
    navSplitIndex,
    setNavSplitIndex,
    setNavUpPosition,
    setNavDownPosition,
    globalNavSplitHappenedOnce,
    setGlobalNavSplitHappenedOnce,
  } = useStore();


  useEffect(() => {
    // 1. Check if we have landed directly on the work page
    const el = navRef?.current;
    console.log('navRef', navRef);
    console.log('el', el);
    if (el && navSplitIndex === null && !globalNavSplitHappenedOnce) {
      console.log('we have landed directly on the work page');
      // 1. Scroll global nav to work link
      const {top, height} = el.querySelector(`#${id}`).getBoundingClientRect();
      el.scrollTo(0, top + el.scrollTop);
      // 2. Wait until the scroll (above) has definitely happened then...
      const split = setTimeout(() => {
        // 3. Calculate translate distance for nav up and down
        const windowHeight = window?.innerHeight;
        const up = -(height - 48);
        const down = windowHeight - 48;
        // 4. Set nav split index to work link
        // 5. Set nav up and down position
        setNavSplitIndex(index);
        setNavUpPosition(up);
        setNavDownPosition(down);
        // 6. Set happenedOnce to true
        setGlobalNavSplitHappenedOnce(true);
      }, 200);
      // 7. Clear timeout
      return () => clearTimeout(split);
    }
  }, [index, navSplitIndex, globalNavSplitHappenedOnce, navRef, setNavSplitIndex, setNavUpPosition, setNavDownPosition, setGlobalNavSplitHappenedOnce, id]);

  return null;
};