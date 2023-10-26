import React, {useEffect} from "react";

import Seo from "../components/molecules/Seo";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import {useStore} from "../utils/store";

const Store = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'store', 3);
  const { setStoreNavSplitHappenedOnce } = useStore();

  useEffect(() => {
    setStoreNavSplitHappenedOnce(true);
  }, [setStoreNavSplitHappenedOnce])
  return (
    <>
      <Seo title="Store" />
    </>
  );
};

export default Store;