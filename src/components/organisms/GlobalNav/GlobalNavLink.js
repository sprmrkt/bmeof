import React, { useEffect, useRef, useState } from "react";
import {Link} from "gatsby";
import propTypes from "prop-types";
import {manualKerning} from "../../../utils/helpers";
import {useStore} from "../../../utils/store";

function GlobalNavLink({
  link,
  index,
  globalNavRef,
}) {
  //store
  const { setNavSplitIndex, setGlobalLinkWidth, setNavDownPosition, setNavUpPosition } = useStore();
  
  const linkRef = useRef(null);

  useEffect(() => {
    // Measure the width of the link element
    if (linkRef.current) {
      const { width } = linkRef.current.getBoundingClientRect();
        // Update the globalLinkWidth state
        setGlobalLinkWidth(width);
        // console.log("new width", globalLinkWidth)
      }
  }, []); // Run this effect once after the initial render

  // methods
  const calculateTranslateDistance = () => {
    const el = globalNavRef.current.querySelector(`#${link.id}`);
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
    setTimeout(() => {
      setNavSplitIndex(index);
      calculateTranslateDistance();
    }, [100]);
  };

  // render
  return (
    <Link
    ref={linkRef}
    to={`${link.slug}`}
      id={link.id}
      className="h1 button"
      onClick={() => handleNavigate()}>
      {manualKerning(link.label)}
    </Link>
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

