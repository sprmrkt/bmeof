import React from "react";
import {navigate} from "gatsby";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import NavButton from "../components/molecules/NavButton";
import Hello from "../components/organisms/Hello";

const Container = styled.div`
  height: calc(100% - 48px);
  margin-top: 48px;
`;

const hello = () => {
  return (
    <Container>
      <NavButton link={`/`} />
      <Hello />
      <CloseButton closeHandler={() => navigate(`/`)} />
    </Container>
  );
};

export default hello;

