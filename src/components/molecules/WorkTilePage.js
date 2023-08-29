import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import WorkTileText from "./WorkTileText";

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-top: 1px solid;
  background-color: ${(props) => props.theme.colors.white};
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 24px 12px 0 24px;
    display: flex;
    flex-direction: column;
    &.even {
      padding: 24px 24px 0 12px;
    }
  }

  button {
    padding: 0;
    border: none;
    @media (${(props) => props.theme.breakpoints.md}) {
      cursor: none;
    }
  }
`;

const WorkTilePage = ({
  toggleProjectHandler,
  toggleInfoHandler,
  open,
  infoOpen,
  even,
  title,
  tileHeight,
  tileWidth,
}) => {
  const tileClasses = classNames({
    open: open,
    even: even,
  });
  const textMarginWhenOpen = Math.max(tileHeight - tileWidth - 48 + 12, 0);

  return (
    <Holder className={tileClasses}>
      <WorkTileText
        tileClasses={tileClasses}
        textMarginWhenOpen={textMarginWhenOpen}
        open={open}
        toggleProjectHandler={(val) => toggleProjectHandler(val)}
        title={title}
        toggleInfoHandler={(val) => toggleInfoHandler(val)}
        infoOpen={infoOpen}
      />
    </Holder>
  );
};

WorkTilePage.propTypes = {
  toggleProjectHandler: PropTypes.func.isRequired,
  toggleInfoHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  infoOpen: PropTypes.bool.isRequired,
  even: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  tileHeight: PropTypes.number,
  tileWidth: PropTypes.number,
};

export default WorkTilePage;

