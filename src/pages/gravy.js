import React from "react";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import Gravy from "../components/organisms/Gravy";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";

const Container = styled.div`
  margin-top: 48px;
`;

const GravyPage = (props) => {
  useInitialGlobalNavSplit(props.globalNav, 'gravy', 4);
  return (
    <Container>
      <Gravy />
      <CloseButton />
    </Container>
  );
};

export default GravyPage;

