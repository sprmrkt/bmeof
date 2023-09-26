import React from "react";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import Studio from "../components/organisms/Studio";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";

const Container = styled.div`
  margin-top: 48px;
`;

const StudioPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'studio', 1);
  return (
    <Container>
      <Studio />
      <CloseButton />
    </Container>
  );
};

export default StudioPage;

