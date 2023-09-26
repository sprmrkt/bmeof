import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import "../utils/fontface.css";

import GlobalStyles from "../components/atoms/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import EmbedOverlay from "../components/atoms/EmbedOverlay";
import StickerHolder from "../components/organisms/StickerHolder";
import GlobalNav from "../components/organisms/GlobalNav/GlobalNav";
import WorkNav from "../components/organisms/WorkNav/WorkNav";

const Main = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

function Index({children, pageContext}) {

  const wrapperRef = useRef(null);

  useEffect(() => {
    // Works!
    // console.log(wrapperRef.current)
  }, [])

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        globalNav: wrapperRef,
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StickerHolder />
        <GlobalNav ref={wrapperRef}/>
        {pageContext.layout === "work" && <WorkNav />}
        <Main>{renderChildren()}</Main>
        <EmbedOverlay />
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;

