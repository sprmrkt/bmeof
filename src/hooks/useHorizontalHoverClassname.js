// import {useRef} from "react";
// import {gsap} from "gsap";
import {useStore} from "../utils/store";
import classNames from "classnames";

export default function useHorizontalHoverClassname() {
  // const horizontalHoverDistance = useStore(state => state.horizontalHoverDistance);
  const horizontalHover = useStore(state => state.horizontalHover);

  return classNames('is-affected-by-horizontal-hover', {
    'horizontal-hover-is-on': horizontalHover
  });
};