import React from "react";
import styled from "styled-components";
import logo from "../assets/img/bear.png";
import Seo from "../components/molecules/Seo";

const Holder = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 100px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 650px;

  p {
    font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 40px;
    line-height: 1.1;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 60px;
    }
    &.link {
      font-family: 'Gotham', "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 20px;
      margin-top: 40px;
    }
  }
`;

const LogoHolder = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-gap: 20px;
  align-items: center;
  margin-bottom: 40px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
  p {
    font-size: 20px;
    line-height: 0.9;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 30px;
    }
  }
`;

function IndexPage() {


  return (
    <>
      <Seo title="Bear Meets Eagle On Fire" />
      <Holder>
        <Inner>
          <LogoHolder>
            <img src={logo} alt="Bear meets eagle on fire" />
            <p>Bear Meets <br/>Eagle On Fire</p>
          </LogoHolder>
          <p>We help good people and brands think and make things differently.</p>
          <p className="link"><a href="mailto:micah@beareaglefire.com" target="_blank" rel="noopener noreferrer">say hello</a></p>
        </Inner>
      </Holder>
    </>
  )
}

export default IndexPage;
