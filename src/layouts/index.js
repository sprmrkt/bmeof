import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import "../utils/fontface.css";

import GlobalStyles from "../components/atoms/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import {theme} from "../utils/styling";
import EmbedOverlay from "../components/atoms/EmbedOverlay";
import GlobalNav from "../components/organisms/GlobalNav/GlobalNav";
import WorkNav from "../components/organisms/WorkNav/WorkNav";
import StoreNav from "../components/organisms/StoreNav/StoreNav";
import {useWindowSize} from "react-use";
import {useStore} from "../utils/store";
import GlobalNavMoveRightButton from "../components/organisms/GlobalNav/GlobalNavMoveRightButton";
import CustomCursor from "../components/atoms/CustomCursor";
import StickerHolder from "../components/organisms/StickerHolder";

const Main = styled.main`
  position: relative;
  width: 100vw;
`;

function Index({children, pageContext}) {

  const globalNavRef = useRef(null);
  const workNavRef = useRef(null);
  const storeNavRef = useRef(null);
  const size = useWindowSize();

  const {closeNav, closeWorkNav, closeStoreNav, setWorkNavSplitHappenedOnce, setStoreNavSplitHappenedOnce, navSplitIndex} = useStore();

  useEffect(() => {
    closeNav();
    closeWorkNav();
    closeStoreNav();
  }, [size, closeNav, closeWorkNav, closeStoreNav]);

  useEffect(() => {
    if (pageContext.layout !== "work") {
      setWorkNavSplitHappenedOnce(true);
    }
  }, [pageContext.layout, setWorkNavSplitHappenedOnce])

  useEffect(() => {
    if (pageContext.layout !== "store") {
      setStoreNavSplitHappenedOnce(true);
    }
  }, [pageContext.layout, setStoreNavSplitHappenedOnce])

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        globalNav: globalNavRef,
        workNav: workNavRef,
        storeNav: storeNavRef,
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <GlobalNav ref={globalNavRef} />
        {navSplitIndex === null &&
          <GlobalNavMoveRightButton />
        }
        <WorkNav ref={workNavRef} visible={pageContext.layout === "work"} />
        <StoreNav ref={storeNavRef} visible={pageContext.layout === "store"} />

        <Main>{renderChildren()}</Main>
        <EmbedOverlay />
        <CustomCursor />
      </>
    </ThemeProvider>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Index;

