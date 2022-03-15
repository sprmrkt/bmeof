import React from "react";
import Seo from "../components/molecules/Seo";
import Container from "../components/atoms/Container";
import styled from "styled-components";
import AccordionGroup from "../components/atoms/AccordionGroup";
import Accordion from "../components/atoms/Accordion";

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
        title={<p className="h1">Work</p>}>
        <p>Content</p>
      </Accordion>
      <Accordion
        title={<p className="h1">Belief</p>}>
        <p>Content</p>
      </Accordion>
      <Accordion
        title={<p className="h1">Studio</p>}>
        <p>Content</p>
      </Accordion>
      <Accordion
        title={<p className="h1">Shop</p>}>
        <p>Content</p>
      </Accordion>
    </Holder>
  )
}

export default IndexPage;
