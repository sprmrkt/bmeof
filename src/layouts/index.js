import React from "react";
import PropTypes from "prop-types";
import "../utils/fontface.css";

import GlobalStyles from "../components/atoms/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import EmbedOverlay from "../components/atoms/EmbedOverlay";
import StickerHolder from "../components/organisms/StickerHolder";
import GlobalNav from "../components/organisms/GlobalNav";
import WorkLayout from "../components/organisms/WorkLayout";

const Main = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

function Index({children, pageContext}) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StickerHolder />
        <GlobalNav />
        {pageContext.layout === "work" && <WorkLayout />}
        <Main>{children}</Main>
        <EmbedOverlay />
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;

