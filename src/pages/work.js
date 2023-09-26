import React, {useEffect} from "react";

import Seo from "../components/molecules/Seo";
import {useStore} from "../utils/store";

const Work = (props) => {
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
    const el = props.globalNav?.current;
    if (el && navSplitIndex === null && !globalNavSplitHappenedOnce) {
      console.log('we have landed directly on the work page');
      // 1. Scroll global nav to work link
      const {top, height} = el.querySelector('#work').getBoundingClientRect();
      el.scrollTo(0, top + el.scrollTop);
      // 2. Wait until the scroll (above) has definitely happened then...
      const split = setTimeout(() => {
        // 3. Calculate translate distance for nav up and down
        const windowHeight = window?.innerHeight;
        const up = -(height - 48);
        const down = windowHeight - 48;
        // 4. Set nav split index to work link
        // 5. Set nav up and down position
        setNavSplitIndex(0);
        setNavUpPosition(up);
        setNavDownPosition(down);
        // 6. Set happenedOnce to true
        setGlobalNavSplitHappenedOnce(true);
      }, 200);
      // 7. Clear timeout
      return () => clearTimeout(split);
    }
  }, [ navSplitIndex, globalNavSplitHappenedOnce, props.globalNav, setNavSplitIndex, setNavUpPosition, setNavDownPosition, setGlobalNavSplitHappenedOnce ]);

  return (
    <>
      <Seo title="Work" />
    </>
  );
};

export default Work;

