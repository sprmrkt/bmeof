import React, {useState, useEffect} from "react";
import {navigate} from "gatsby";
import {node} from "prop-types";
import styled from "styled-components";

import {manualKerning} from "../../utils/helpers";

const ButtonLink = styled.button`
  display: block;
  transition: transform ${({time}) => time}ms linear;

  transform: translateY(${({distance}) => `${distance}px` || "0"});

  background-color: #c6c6c6;

  z-index: 1;
`;

function NavLink({
  link,
  index,
  isTransitioning,
  setIsTransitioning,
  transitionIndex,
  setTransitionIndex,
}) {
  // state
  const [translateDistance, setTranslateDistance] = useState(0);
  const [translateTime, setTranslateTime] = useState(300);

  // methods
  const calculateTransitionDistance = el => {
    const {bottom, height} = el?.getBoundingClientRect();

    const baseTransitionTime = 300;
    const maxDistance = window?.innerHeight;

    if (index <= transitionIndex) {
      setTranslateDistance(bottom * -1);

      //   const relativeTransitionTime =
      //     (-bottom / maxDistance) * baseTransitionTime;
      //   setTranslateTime(Math.max(relativeTransitionTime, baseTransitionTime));
    } else if (index > transitionIndex) {
      setTranslateDistance(bottom + height);

      //   const relativeTransitionTime =
      //     (bottom + height / maxDistance) * baseTransitionTime;
      //   setTranslateTime(Math.max(relativeTransitionTime, baseTransitionTime));
    }
  };

  const handleNavigate = () => {
    setIsTransitioning(true);
    setTransitionIndex(index);
    navigate(link.slug);

    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionIndex(null);
      //   navigate(`/`);
    }, [3000]);
  };

  // lifecycle
  useEffect(() => {
    if (!link?.ref?.current) return;

    if (!isTransitioning) {
      setTranslateDistance(0);
      return;
    }

    calculateTransitionDistance(link.ref.current);
  }, [isTransitioning, link.ref.current]);

  // render
  return (
    <ButtonLink
      ref={link.ref}
      role="button"
      className="h1"
      distance={translateDistance}
      time={translateTime}
      onClick={() => handleNavigate(link.slug)}>
      {manualKerning(link.label)}
    </ButtonLink>
  );
}

export default NavLink;

