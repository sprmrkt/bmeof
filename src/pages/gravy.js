import React from "react";
import CloseButton from "../components/atoms/CloseButton";
import Gravy from "../components/organisms/Gravy";
import useInitialGlobalNavSplit from "../hooks/useInitialGlobalNavSplit";
import styled from "styled-components";

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

