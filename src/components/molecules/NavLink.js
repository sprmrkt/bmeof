import React from "react";
import {navigate} from "gatsby";
import propTypes from "prop-types";

import {manualKerning} from "../../utils/helpers";
import {useStore} from "../../utils/store";

function NavLink({
  link,
  index,
  setTransitionIndex,
  setTranslateUp,
  setTranslateDown,
}) {
  //store
  const {closeNav} = useStore();

  // methods
  const calculateTranslateDistance = () => {
    const el = link?.ref?.current;
    if (!el) return;

    const {top, bottom, height} = el?.getBoundingClientRect();

    const windowHeight = window?.innerHeight;
    const elHeight = height / 4;
    const up = (bottom + elHeight) * -1;
    const down = windowHeight - top + elHeight;

    setTranslateUp(up);
    setTranslateDown(down);
  };

  const handleNavigate = () => {
    navigate(link.slug);

    setTimeout(() => {
      closeNav();
      setTransitionIndex(index);
      calculateTranslateDistance();
    }, [100]);
  };

  // render
  return (
    <button
      ref={link.ref}
      role="button"
      className="h1"
      onClick={() => handleNavigate(link.slug)}>
      {manualKerning(link.label)}
    </button>
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
  setTransitionIndex: propTypes.func,
  setTranslateUp: propTypes.func,
  setTranslateDown: propTypes.func,
};

