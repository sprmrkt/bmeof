import React, {useEffect} from "react";

import Seo from "../components/molecules/Seo";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import {useStore} from "../utils/store";

const Work = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'work', 0);
  const { setWorkNavSplitHappenedOnce } = useStore();

  useEffect(() => {
    setWorkNavSplitHappenedOnce(true);
  }, [setWorkNavSplitHappenedOnce])
  return (
    <>
      <Seo title="Work" />
    </>
  );
};

export default Work;

