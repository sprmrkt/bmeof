import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

import MediaItem from "../../molecules/MediaItem";
import PrismicRichText from "../../atoms/PrismicRichText";

import { useStore } from "../../../utils/store";

const Holder = styled.div`
  width: 100%;
  padding: 15px 15px 0 15px;
  border-top: 1px solid;
  background-color: ${({ theme }) => theme.colors.white};
  @media (${(props) => props.theme.breakpoints.md}) {
    padding: 24px 12px 0 24px;
    display: flex;
    flex-direction: column;
    &.odd {
      padding: 24px 24px 0 12px;
    }
  }

  p {
    text-align: left;
  }

  a {
    width: 100%;
    display: block;
  }
`;
const Excerpt = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  text-align: left;

  p {
    white-space: normal;
    margin: 16px 24px 24px 16px;
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.15;
    transition: opacity 0.25s ease-in-out;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }
`;
const ImageHolder = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;

  @media (${(props) => props.theme.breakpoints.md}) {
    &:hover {
      ${Excerpt} {
        .inner {
          opacity: 1;
        }
      }

      .media-holder {
        opacity: 0.15;
      }
    }
  }

  .media-holder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    transition: opacity 0.1s ease-in-out;
  }
`;

const TitleHolder = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
  }
`;

const StoreNavLink = (props) => {
  const { title, title_image, excerpt, price } = props.product.data;

  //store
  const {
    setNavUpPosition,
    navUpPosition,
    setStoreNavSplitIndex,
    setStoreNavUpPosition,
    setStoreNavDownPosition,
  } = useStore();

  // variables
  const id = `store-${props.product.id}`;
  const link = props.product.uid && `/store/${props.product.uid}`;
  const tileClasses = classNames({
    storeTile: true,
    odd: props.odd,
  });

  // methods
  const calculateTranslateDistance = () => {
    const el = props?.storeNavRef?.current.querySelector(`#${id}`);
    if (!el) return;

    const { top, bottom } = el?.getBoundingClientRect();

    const windowHeight = window?.innerHeight;

    const up = -bottom + 48;
    const down = windowHeight - top;

    setStoreNavUpPosition(up);
    setStoreNavDownPosition(down);
  };

  const handleNavigate = () => {
    setStoreNavSplitIndex(props.index);
    calculateTranslateDistance();
    setNavUpPosition(navUpPosition - 50);
  };

  return (
    <Link
      to={link}
      id={id}
      data-id={props.product.id}
      role="button"
      className="storeTileHolder"
      onClick={handleNavigate}>
      <Holder className={tileClasses}>
        <ImageHolder>
          <div className="media-holder">
            <MediaItem
              media={{
                image: title_image,
              }}
            />
          </div>
          <Excerpt>
            <div className="inner p-large">
              <PrismicRichText render={excerpt?.richText} />
            </div>
          </Excerpt>
        </ImageHolder>
        <TitleHolder>
          <p>{title.text}</p>

          <p>${price}</p>
        </TitleHolder>
      </Holder>
    </Link>
  );
};

StoreNavLink.propTypes = {
  odd: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
};

export default StoreNavLink;

