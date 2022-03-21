import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Accordion from "../components/atoms/Accordion";
import WorkList from "../components/organisms/WorkList";

const Holder = styled.div`
  svg {
    width: 4rem;
    height: auto;
    margin-right: 2rem;
  }
`;

function IndexPage() {
  return (
    <Holder>
      <Seo title="Home" />
      <h1>
        Bear<br />
        Meets<br />
        Eagle<br />
        On<br />
        Fire<br />
      </h1>
      <Accordion
        id="work"
        button="Work">
        <WorkList/>
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
        <p>Content</p>
      </Accordion>
    </Holder>
  )
}

export default IndexPage;
