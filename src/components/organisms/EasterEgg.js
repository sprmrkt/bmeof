import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Crazy from "./Crazy";

const Holder = styled.div`

  button {
    display: block;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
    background: blue;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    margin: 0;
    background: radial-gradient(circle at 4rem 4rem, lightskyblue, blue);
    font-size: 0;
    line-height: 0;
  }
`;

function EasterEgg() {
  const [showButton, setShowButton] = useState(false);
  const [showCrazy, setShowCrazy] = useState(false);

  useEffect(() => {
    const show = setInterval(() => {
      setShowButton(true)
      const hide = setTimeout(() => {
        setShowButton(false)
      }, 1000);
      return () => clearTimeout(hide);
    }, 4000);
    return () => clearInterval(show);

  }, []);

  return (
    <Holder>
      {showButton && <button onClick={() => setShowCrazy(!showCrazy)}>Open crazy</button>}
      <Crazy show={showCrazy}/>
    </Holder>
  )
}

export default EasterEgg;