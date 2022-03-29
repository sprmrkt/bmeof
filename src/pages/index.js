import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Accordion from "../components/atoms/Accordion";
import WorkList from "../components/organisms/WorkList";
import LoopingScroll from "../components/organisms/LoopingScroll";
import ProductList from "../components/organisms/ProductList";
import Belief from "../components/organisms/Belief";
import Studio from "../components/organisms/Studio";

const Holder = styled.div`
  width: 100%;
  overflow: hidden;
  h1, .h1 {
    margin-left: 12px;
  }
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
        button="Belief">
        <Belief/>
      </Accordion>
      <Accordion
        id="studio"
        scrollAfterOpen
        button="Studio">
        <Studio/>
      </Accordion>
      <Accordion
        id="shop"
        scrollAfterOpen
        button="Shop">
        <ProductList/>
      </Accordion>
      <p className="h1">
        <span>
          Some <br/>
          other <br/>
          links <br/>
          go <br/>
          here <br/>
        </span>
      </p>
      <LoopingScroll />
    </Holder>
  )
}

export default IndexPage;
