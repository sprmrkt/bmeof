import React from "react";
import Seo from "../components/molecules/Seo";
import styled from "styled-components";
import Accordion from "../components/atoms/Accordion";
import WorkContent from "../components/organisms/WorkContent";

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
        button={<p className="h1">Work</p>}>
        <WorkContent/>
      </Accordion>
      <Accordion
        id="belief"
        scrollAfterOpen
        button={<p className="h1">Belief</p>}>
        <p>Content</p>
      </Accordion>
      <Accordion
        id="studio"
        scrollAfterOpen
        button={<p className="h1">Studio</p>}>
        <p>Content</p>
      </Accordion>
      <Accordion
        id="shop"
        scrollAfterOpen
        button={<p className="h1">Shop</p>}>
        <p>Content</p>
      </Accordion>
    </Holder>
  )
}

export default IndexPage;
