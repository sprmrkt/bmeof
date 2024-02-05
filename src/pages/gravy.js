import React from "react";
import Gravy from "../components/organisms/Gravy";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import PageHolder from "../components/organisms/PageHolder";

const GravyPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'gravy', 4);
  return (
    <PageHolder>
      <Gravy />
    </PageHolder>
  );
};

export default GravyPage;

