import {navigate} from "gatsby";
import React from "react";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import NavButton from "../components/molecules/NavButton";
import Studio from "../components/organisms/Studio";

const Container = styled.div`
  margin-top: 48px;
`;

const studio = () => {
  return (
    <Container>
      <NavButton link={`/`} />
      <Studio />
      <CloseButton closeHandler={() => navigate(`/`)} />
    </Container>
  );
};

export default studio;

