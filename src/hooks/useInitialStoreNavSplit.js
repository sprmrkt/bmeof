import {useStore} from "../utils/store";
import {useEffect} from "react";

export default function useInitialStoreNavSplit(storeNavRef, id, index) {
  const {
    storeNavSplitIndex,
    setStoreNavSplitIndex,
    setStoreNavUpPosition,
    setStoreNavDownPosition,
    storeNavSplitHappenedOnce,
    setStoreNavSplitHappenedOnce,
  } = useStore();


  useEffect(() => {
    // 1. Check if we have landed directly on the store page
    const el = storeNavRef?.current;
    if (el && storeNavSplitIndex === null && !storeNavSplitHappenedOnce) {
      // 1. Scroll global nav to store link
      const {top, height} = el.querySelector(`#store-${id}`).getBoundingClientRect();
      el.scrollTo(0, top + el.scrollTop);
      // 2. Wait until the scroll (above) has definitely happened then...
      const split = setTimeout(() => {
        // 3. Calculate translate distance for nav up and down
        const windowHeight = window?.innerHeight;
        let up = -(height - 48);
        const down = windowHeight - 48;
        // 4. Set nav split index to store link
        // 5. Set nav up and down position
        setStoreNavSplitIndex(index);
        setStoreNavUpPosition(up);
        setStoreNavDownPosition(down);
        // 6. Set happenedOnce to true
        setStoreNavSplitHappenedOnce(true);
      }, 500);
      // 7. Clear timeout
      return () => clearTimeout(split);
    }
  }, [index, storeNavSplitIndex, storeNavSplitHappenedOnce, storeNavRef, setStoreNavSplitIndex, setStoreNavUpPosition, setStoreNavDownPosition, setStoreNavSplitHappenedOnce, id]);

  return null;
};