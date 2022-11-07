import React from "react"
import Seo from "../components/molecules/Seo"
import logo from "../assets/img/bear.png";
import styled from "styled-components";
import {Link} from "gatsby";

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

const NotFoundPage = () => (
  <>
    <Seo title="404: Not found" />
    <Holder>
      <Inner>
        <LogoHolder>
          <img src={logo} alt="Bear meets eagle on fire" />
          <p>Bear Meets <br/>Eagle On Fire</p>
        </LogoHolder>
        <p>You've hit a 404 error.</p>
        <p className="link"><Link to={'/'}>back to home</Link></p>
      </Inner>
    </Holder>
  </>
)

export default NotFoundPage
