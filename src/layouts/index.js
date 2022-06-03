import React from "react";
import PropTypes from "prop-types";
import '../utils/fontface.css';

import GlobalStyles from "../components/atoms/GlobalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import CustomCursor from "../components/atoms/CustomCursor";
import EmbedOverlay from "../components/atoms/EmbedOverlay";


function Index({children}) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {children}
        <EmbedOverlay/>
        <CustomCursor />
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;
