import {navigate} from "gatsby";
import React from "react";
import styled from "styled-components";

import CloseButton from "../components/atoms/CloseButton";
import NavButton from "../components/molecules/NavButton";

import bear from "../assets/img/bear.png";

const Holder = styled.div`
  height: calc(100% - 48px);
  margin-top: 48px;
  -webkit-overflow-scrolling: touch;
`;

const Inner = styled.div`
  min-height: calc(var(--windowHeight) - 48px - 48px);
  padding: 15px;
  display: grid;

  grid-template-columns: 1fr 1fr;

  @media (${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  align-content: start;
  grid-gap: 24px;
  @media (${props => props.theme.breakpoints.md}) {
    padding: 24px;
  }

  > div {
    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }
  }
`;
const store = () => {
  return (
    <Holder>
      <NavButton link={`/`} />
      <Inner>
        <section>
          <h2>Silver Stacking Ring</h2>
          <div className="Product__image">
            <img src={bear} alt="bear" />
          </div>
          <p>$19.99</p>
          <p>
            Product description Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Veritatis debitis libero assumenda delectus quas.
            Quo, tenetur doloribus! Reiciendis, iure quia?
          </p>
          <button
            className="snipcart-add-item"
            data-item-id="silver-stacking-ring"
            data-item-price={19.99}
            data-item-url="/"
            data-item-name="Silver Stacking Ring"
            data-item-custom1-name="Size"
            data-item-custom1-options="6|6.5|7|7.5|8|8.5|9"
            data-item-custom2-name="This is a gift"
            data-item-custom2-type="checkbox">
            Add to cart
          </button>
        </section>
        <section>
          <h2>Product 2</h2>
          <div className="Product__image">
            <img src={bear} alt="bear" />
          </div>
          <p>$29.99</p>
          <p>
            Product description Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Veritatis debitis libero assumenda delectus quas.
            Quo, tenetur doloribus! Reiciendis, iure quia?
          </p>
          <button
            className="snipcart-add-item"
            data-item-id="product-2"
            data-item-price={29.99}
            data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
            data-item-url="/"
            data-item-image={bear}
            data-item-name="Product 2"
            data-item-custom2-name="Custom"
            data-item-custom2-options="Custom 1|Custom 2|Custom 3[+50.00]">
            Add to cart
          </button>
        </section>
        <section>
          <h2>Product 3</h2>
          <div className="Product__image">
            <img src={bear} alt="bear" />
          </div>
          <p>$19.99</p>
          <p>
            Product description 3 Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Veritatis debitis libero assumenda delectus quas.
            Quo, tenetur doloribus! Reiciendis, iure quia?
          </p>
          <button
            className="snipcart-add-item"
            data-item-id="product-3"
            data-item-price={19.99}
            data-item-url="/"
            data-item-name="Product 3">
            Add to cart
          </button>
        </section>
      </Inner>
      <CloseButton closeHandler={() => navigate(`/`)} />
    </Holder>
  );
};

export default store;

