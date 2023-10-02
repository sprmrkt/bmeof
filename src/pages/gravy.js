import React from "react";

import CloseButton from "../components/atoms/CloseButton";
import Gravy from "../components/organisms/Gravy";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";


const GravyPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'gravy', 4);
  return (
    <>
      <Gravy />
      <CloseButton />
    </>
  );
};

export default GravyPage;

