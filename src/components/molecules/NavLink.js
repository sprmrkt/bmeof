import React, {useState, useEffect} from "react";
import {navigate} from "gatsby";
import propTypes from "prop-types";
import styled from "styled-components";

import {manualKerning} from "../../utils/helpers";

const ButtonLink = styled.button`
  display: block;
  background-color: #c6c6c6;

  transition: transform 300ms linear;
  transform: translateY(${({distance}) => `${distance}px` || "0"});
  will-change: transform;
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

  // methods
  const calculateTransitionDistance = el => {
    const {top, bottom, height} = el?.getBoundingClientRect();

    const windowHeight = window?.innerHeight;

    if (index <= transitionIndex) {
      const up = (bottom + height / 4) * -1;
      setTranslateDistance(up);
    } else if (index > transitionIndex) {
      const down = windowHeight - top + height / 4;
      setTranslateDistance(down);
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
      onClick={() => handleNavigate(link.slug)}>
      {manualKerning(link.label)}
    </ButtonLink>
  );
}

export default NavLink;

NavLink.propTypes = {
  link: propTypes.shape({
    ref: propTypes.shape({current: propTypes.instanceOf(Element)}),
    id: propTypes.number,
    slug: propTypes.string,
    label: propTypes.string,
  }),
  index: propTypes.number,
  isTransitioning: propTypes.bool,
  setIsTransitioning: propTypes.func,
  transitionIndex: propTypes.number,
  setTransitionIndex: propTypes.func,
};

