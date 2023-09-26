import React, {useEffect} from "react";

import Seo from "../components/molecules/Seo";
import {useStore} from "../utils/store";

function IndexPage() {
  const { setGlobalNavSplitHappenedOnce } = useStore();

  useEffect(() => {
    setGlobalNavSplitHappenedOnce(true);
  }, [setGlobalNavSplitHappenedOnce])

  return (
    <>
      <Seo title="Home" />
    </>
  );
}

export default IndexPage;

