import React from "react";
import PropTypes from "prop-types";
import '../utils/fontface.css';

import Header from "../components/molecules/Header";
import Transition from "../components/atoms/Transition";

import GlobalStyles from "../components/atoms/GlobalStyles";
import {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import EasterEgg from "../components/organisms/EasterEgg";

function Index({location, children}) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <EasterEgg/>
        <Transition location={location}>
          <main>{children}</main>
        </Transition>
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;
