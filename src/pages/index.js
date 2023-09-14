import React, {useEffect} from "react";

import Seo from "../components/molecules/Seo";
import {useStore} from "../utils/store";

function IndexPage() {
  // state
  const {setNavActive} = useStore();

  // lifecycle
  useEffect(() => {
    setNavActive(true);
  }, []);

  return (
    <>
      <Seo title="Home" />
    </>
  );
}

export default IndexPage;

