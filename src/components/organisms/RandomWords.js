import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {useOnScreen} from "../../hooks/useOnScreen";

const Holder = styled.div`
  .trigger {
    width: 100%;
    height: 2px;
    background-color: mediumpurple;
  }
`;

const words = [
  'What',
  'will',
  'these',
  'actually',
  'be?',
  'What',
  'will',
  'these',
  'actually',
  'be?',
  'What',
  'will',
  'these',
  'actually',
  'be?'
]

function RandomWords() {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if(isOnScreen) {
      const timer = setTimeout(() => {
        setCount(Math.min(count + 4, words.length));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOnScreen]);

  useEffect(() => {

  }, []);

  return (
    <Holder>
      {count > 0 && words.map((word, i) => i < count && <p key={i} className="h1"><span>{word}</span></p>)}
      <div ref={elementRef} className="trigger" />
    </Holder>
  )
}

export default RandomWords;