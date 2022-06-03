import React, {useLayoutEffect} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const Holder = styled.div`
  width: 0;
  height: 0;
  opacity: 0;
`;

function LockScroll({fixedBody}) {
  useLayoutEffect(() => {
    let ourBody = fixedBody.current
    // Prevent scrolling on mount
    ourBody.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (ourBody.style.overflow = "");
  });

  return (
    <Holder/>
  )
}

LockScroll.propTypes = {
  fixedBody: PropTypes.object,
};

export default LockScroll;