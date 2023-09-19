import React, {useEffect} from "react";

import Seo from "../components/molecules/Seo";
import {useStore} from "../utils/store";

const Work = () => {
  // state
  const {setWorkActive} = useStore();

  // lifecycle
  useEffect(() => {
    setWorkActive(true);
  }, []);

  return (
    <>
      <Seo title="Work" />
    </>
  );
};

export default Work;

