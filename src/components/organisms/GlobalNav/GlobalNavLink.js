import React from "react";
import { navigate } from "gatsby";
import propTypes from "prop-types";

import { manualKerning } from "../../../utils/helpers";
import { useStore } from "../../../utils/store";

function GlobalNavLink({ link, index, globalNavRef }) {
  //store
  const { setNavSplitIndex, setNavUpPosition, setNavDownPosition } = useStore();

  // methods
  const calculateTranslateDistance = () => {
    const el = globalNavRef.current.querySelector(`#${link.id}`);
    if (!el) return;

    const { top, bottom, height } = el?.getBoundingClientRect();

    const windowHeight = window?.innerHeight;
    const up = -(bottom - 48);
    const down = windowHeight - top - height;

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
    ref: propTypes.shape({ current: propTypes.string }),
    id: propTypes.string,
    slug: propTypes.string,
    label: propTypes.string,
  }),
  index: propTypes.number,
};

