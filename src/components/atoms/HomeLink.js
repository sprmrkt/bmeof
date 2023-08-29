import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { useStore } from "../../utils/store";
import { manualKerning } from "../../utils/helpers";
import PropTypes from "prop-types";

const Holder = styled.div`

a {
    font-size: 33.5vw;
  line-height: 0.75;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  display: block;
  overflow: hidden;
  width: 100%;
  text-align: left;
  padding-left: 12px;
  transition: all 0.25s linear;
  white-space: normal;
  position: relative;
  @media (${(props) => props.theme.breakpoints.md}) {
    cursor: none;
  }

  .large-text-outer {
    @media (${(props) => props.theme.breakpoints.md}) {
      display: inline-block;
    }
  }

  .large-text-wrapper {
    display: inline-block;
    transition: transform 0.25s linear;
  }

  .manual-kerning:hover {
    @media (${(props) => props.theme.breakpoints.md}) {
      color: rgb(70, 70, 70);
    }
  }

    @media (${(props) => props.theme.breakpoints.md}) {
      .large-text-wrapper {
        transform: translateY(-0.04em);
      }
    }
  }

  @supports (-moz-appearance: none) {
    .large-text-wrapper {
      display: block;
      transform: translateY(0.1em);
    }

    &.is-open {
      @media (${(props) => props.theme.breakpoints.md}) {
        .large-text-wrapper {
          transform: translateY(0.06em);
        }
      }
    }
  }
}
 
`;

const HomeLink = ({ link, text }) => {
  const setCustomCursorIsVisible = useStore(
    (state) => state.setCustomCursorIsVisible
  );
  return (
    <Holder>
      <Link
        onMouseEnter={() => setCustomCursorIsVisible(true)}
        onMouseLeave={() => setCustomCursorIsVisible(false)}
        to={link}
      >
        <span className={`large-text-outer`}>
          <span className="large-text-wrapper">{manualKerning(text)}</span>
        </span>
      </Link>
    </Holder>
  );
};
HomeLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
};
export default HomeLink;

