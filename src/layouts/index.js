import React from "react";
import PropTypes from "prop-types";
import '../utils/fontface.css';

import Header from "../components/molecules/Header";
import Transition from "../components/atoms/Transition";

import GlobalStyles from "../components/atoms/GlobalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import CustomCursor from "../components/atoms/CustomCursor";

function Index({location, children}) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <Transition location={location}>
          <main>{children}</main>
        </Transition>
        <CustomCursor/>
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;
