import React from "react";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import Hello from "../components/organisms/Hello";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";

const Container = styled.div`
  height: calc(100% - 48px);
  margin-top: 48px;
`;

const HelloPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'hello', 2);
  return (
    <Container>
      <Hello />
      <CloseButton />
    </Container>
  );
};

export default HelloPage;

