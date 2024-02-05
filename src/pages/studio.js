import React from "react";
import Studio from "../components/organisms/Studio";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import PageHolder from "../components/organisms/PageHolder";

const StudioPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'studio', 1);
  return (
    <PageHolder>
      <Studio />
    </PageHolder>
  );
};

export default StudioPage;

