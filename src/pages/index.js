import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Accordion from "../components/atoms/Accordion";
import WorkList from "../components/organisms/WorkList";
import LoopingScroll from "../components/organisms/LoopingScroll";
import ProductList from "../components/organisms/ProductList";

const Holder = styled.div`
  width: 100%;
  overflow: hidden;
`;

function IndexPage() {
  return (
    <Holder>
      <Seo title="Home" />
      <h1>
        <span>
        Bear<br />
        Meets<br />
        Eagle<br />
        On<br />
        Fire<br />
        </span>
      </h1>
      <Accordion
        id="work"
        button="Work">
        <WorkList />
      </Accordion>
      <Accordion
        id="belief"
        scrollAfterOpen
        button="Belief">
        <p>Content</p>
      </Accordion>
      <Accordion
        id="studio"
        scrollAfterOpen
        button="Studio">
        <p>Content</p>
      </Accordion>
      <Accordion
        id="shop"
        scrollAfterOpen
        button="Shop">
        <ProductList/>
      </Accordion>
      <LoopingScroll />
    </Holder>
  )
}

export default IndexPage;
