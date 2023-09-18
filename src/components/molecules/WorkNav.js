import React from "react";
import {Link} from "gatsby";
import propTypes from "prop-types";
import styled from "styled-components";

import WorkTile from "../molecules/WorkTile";

const Nav = styled(Link)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.colors.white};

  z-index: 10;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
  .workTileHolder:first-child,
  .workTileHolder:nth-child(2) {
    .workTile {
      border-top: none;
    }
  }

  padding-bottom: 24px;
  transform: translateY(calc((100% - 48px) * -1));
  pointer-events: none;
`;

const WorkNav = ({current, even, link, sibling}) => {
  return (
    <Nav to={link}>
      <Grid>
        {!even && <WorkTile work={{data: sibling}} even={false} />}
        <WorkTile work={{data: current}} even={even} />
        {even && <WorkTile work={{data: sibling}} even={true} />}
      </Grid>
    </Nav>
  );
};

export default WorkNav;

WorkNav.propTypes = {
  current: propTypes.object.isRequired,
  even: propTypes.bool.isRequired,
  link: propTypes.string.isRequired,
  sibling: propTypes.object.isRequired,
};

