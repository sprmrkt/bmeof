import React from "react";
import Hello from "../components/organisms/Hello";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import PageHolder from "../components/organisms/PageHolder";

const HelloPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'hello', 2);
  return (
    <PageHolder>
      <Hello />
    </PageHolder>
  );
};

export default HelloPage;

