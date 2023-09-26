import React from "react";

import Seo from "../components/molecules/Seo";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";

const Work = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'work', 0);
  return (
    <>
      <Seo title="Work" />
    </>
  );
};

export default Work;

