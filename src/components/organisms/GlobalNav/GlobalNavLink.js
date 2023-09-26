import React from "react";
import {navigate} from "gatsby";
import propTypes from "prop-types";

import {manualKerning} from "../../../utils/helpers";
import {useStore} from "../../../utils/store";

function GlobalNavLink({
  link,
  index,
  wrapperRef,
}) {
  //store
  const { setNavSplitIndex } = useStore();
  const { setNavUpPosition } = useStore();
  const { setNavDownPosition } = useStore();

  // methods
  const calculateTranslateDistance = () => {
    const el = wrapperRef.current.querySelector(`#${link.id}`);
    if (!el) return;

    const {top, bottom, height} = el?.getBoundingClientRect();

    const windowHeight = window?.innerHeight;
    const elHeight = height / 4;
    const up = -(bottom - 48);
    const down = windowHeight - top + elHeight;

    setNavUpPosition(up);
    setNavDownPosition(down);
  };

  const handleNavigate = () => {
    navigate(link.slug);

    setTimeout(() => {
      setNavSplitIndex(index);
      calculateTranslateDistance();
    }, [100]);
  };

  // render
  return (
    <button
      id={link.id}
      className="h1"
      onClick={() => handleNavigate(link.slug)}>
      {manualKerning(link.label)}
    </button>
  );
}

export default GlobalNavLink;

GlobalNavLink.propTypes = {
  link: propTypes.shape({
    ref: propTypes.shape({current: propTypes.string}),
    id: propTypes.string,
    slug: propTypes.string,
    label: propTypes.string,
  }),
  index: propTypes.number,
};
