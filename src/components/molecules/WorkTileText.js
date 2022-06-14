import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import {useStore} from "../../utils/store";

const TextHolder = styled.div`
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 24px;
  align-items: center;
  width: 100%;
  transition: all 0.25s;
  margin-top: 0;

  &.open {
    background-color: ${props => props.theme.colors.white};
    position: relative;
    border-bottom: 1px solid;
    width: calc(100% + 30px);
    margin-left: -15px;
    padding: 0 15px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      width: calc(200% + 72px);
      margin-left: -24px;
      padding: 0 24px;
      margin-top: ${props => props.textMarginWhenOpen}px;
      &.even {
        margin-left: calc(-100% - 48px);
      }
    }

    .title-toggle-project {
      display: none;
      @media ( ${props => props.theme.breakpoints.md} ) {
        display: initial;
      }
    }

    .title-toggle-info {
      display: block;
      @media ( ${props => props.theme.breakpoints.md} ) {
        display: none;
      }
    }

    .title {
      grid-column: span 2;
      @media ( ${props => props.theme.breakpoints.md} ) {
        grid-column: span 1;
      }
    }

    .toggle-info, .toggle-project {
      opacity: 1;
    }
  }

  p {
    margin: 0;

    button {
      line-height: 48px;
      width: 100%;
      text-align: left;
      display: inline-block;
    }
  }

`;

const Title = styled.p`
  grid-column: span 3;

  .plus {
    display: inline-block;
    transition: transform 0.25s;
    transform: translateY(0.025rem);
  }

  &.infoOpen .plus {
    transform: translateY(0.05rem) rotate(45deg);
  }
`;

const ToggleInfo = styled.p`
  display: none;
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: block;
    opacity: 0;
    transition: opacity 0.25s;
  }

  button {
    display: inline-flex !important;
    align-items: center;

    .cross {
      display: inline-block;
      transition: transform 0.25s;
      margin-left: 0.5rem;
      transform: translateY(0.025rem);
    }
  }

  &.infoOpen {
    .cross {
      transform: translateY(0.05rem) rotate(45deg);
    }
  }
`;

const ToggleProject = styled.p`
  opacity: 0;
  transition: opacity 0.25s;
  justify-self: end;
`;


function WorkTileText({
                        tileClasses,
                        textMarginWhenOpen,
                        open,
                        toggleProjectHandler,
                        title,
                        toggleInfoHandler,
                        infoOpen
                      }) {

  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  return (
    <TextHolder className={tileClasses} textMarginWhenOpen={textMarginWhenOpen}>

      <Title className={`title ${infoOpen ? 'infoOpen' : ''}`}>

        <button
          className="title-toggle-project"
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => toggleProjectHandler(!open)}>{title}</button>

        {open && <button
          className="mobile title-toggle-info"
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => toggleInfoHandler(!infoOpen)}>
          <span>{title}</span> <span className="plus">+</span>
        </button>}

      </Title>

      {open && <ToggleInfo className={`toggle-info ${infoOpen ? 'infoOpen' : ''}`}>
        <button
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => toggleInfoHandler()}><span>Project Overview</span><span className="cross">+</span></button>
      </ToggleInfo>}

      {open && <ToggleProject className="toggle-project">
        <button
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          onClick={() => toggleProjectHandler(false)}>Back
        </button>
      </ToggleProject>}

    </TextHolder>
  )
}

WorkTileText.propTypes = {
  tileClasses: PropTypes.string.isRequired,
  textMarginWhenOpen: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  toggleProjectHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleInfoHandler: PropTypes.func.isRequired,
  infoOpen: PropTypes.bool.isRequired,
};

export default WorkTileText;