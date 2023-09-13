import React from "react";
import PropTypes from "prop-types";
import "../utils/fontface.css";

import GlobalStyles from "../components/atoms/GlobalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import EmbedOverlay from "../components/atoms/EmbedOverlay";
import StickerHolder from "../components/organisms/StickerHolder";
import GlobalNav from "../components/organisms/GlobalNav";

function Index({children}) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          {/* <StickerHolder /> */}
          <GlobalNav />
          {children}
        </div>
        <EmbedOverlay />
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;

