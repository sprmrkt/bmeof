import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${(props) => props.theme.fluidType(0)};

    * { box-sizing: border-box; }
  }

  body {
    margin: 0;
    // Use system fonts: https://css-tricks.com/snippets/css/system-font-stack/
    font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.white};
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 0.75;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    margin: 0;
  }

  p, .p,
  ol, ul, li,
  code, kbd, pre, samp {
    font-family: 'Gotham', "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 16px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    font-weight: normal;

    a { text-decoration: none; }

    a:hover { text-decoration: none; }
  }

  h1, .h1 {
    font-size: 33.5vw;
    font-kerning: normal;
    @supports (-moz-appearance:none) {
      .large-text-wrapper {
        display: block;
        transform: translateY(0.1em);
      }
    }
  }

  h2, .h2,
  h3, .h3,
  h4, .h4,
  h5, .h5,
  h6, .h6 { font-size: 15px; }

  .p, p, li {
    font-size: 15px;
  }

  .p-large p, p.large {
    font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 30px;
    line-height: 27px;
    margin-bottom: 0.75em;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 72px;
      line-height: 66px;
    }
  }

  li {
    margin-top: 0;
    margin-bottom: 0;
  }

  small, p.small { font-size: 15px; }

  code, kbd, pre, samp {
    font-family: monospace;
    white-space: normal;
  }

  ul {
    padding-left: 24px;
    list-style-type: disc;
  }

  ol {
    padding-left: 24px;
    list-style-type: decimal;
  }

  video {
    width: 100%;
    height: auto;
  }

  .gatsby-image-wrapper {
    pointer-events: none;
  }

  // Specific to PrismicRichText component
  .block-img {
    img {
      width: 100%;
      height: auto;
      display: block;
      margin: 3rem 0;
    }
  }

  // Specific to PrismicRichText component
  .embed {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    margin: 3rem 0;

    iframe,
    object,
    embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  em, i { font-style: italic; }

  strong, b { font-weight: normal; }

  blockquote {
    font-weight: bold;
    padding-left: 24px;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.5s linear;

    &:hover {
      @media ( ${props => props.theme.breakpoints.md} ) {
        color: rgb(70, 70, 70);
      }
    }
  }

  sup, sub {
    vertical-align: baseline;
    position: relative;
    top: -0.4em;
  }

  sub { top: 0.4em; }

  label {
    ${(props) => props.theme.fluidType(-1)};
    line-height: 1.2;
    font-weight: normal;
  }

  .fieldset {
    margin: 0.5rem 0;
  }

  .text-input,
  input[type="text"],
  input[type="password"],
  input[type="date"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="range"],
  input[type="search"],
  input[type="tel"],
  input[type="time"],
  input[type="url"],
  input[type="week"],
  textarea {
    display: block;
    font-family: inherit;
    ${(props) => props.theme.fluidType(0)};
    padding: 0.2rem 0.5rem;
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid;
    border-radius: 2px;
    line-height: 1.6;
    background-color: transparent;
    -webkit-appearance: none;

    &:focus {
      border: 1px ${(props) => props.theme.colors.focus} solid;
    }
  }

  ::placeholder {
    color: ${props => props.theme.colors.black};
    opacity: 0.6;
  }

  .file-input,
  input[type="file"],
  .radio-input,
  input[type="radio"],
  .checkbox-input,
  input[type="checkbox"],
  select {
    font-family: inherit;
  }

  // Select

  select {
    // A reset of styles, including removing the default dropdown arrow
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 2rem;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
    color: ${props => props.theme.colors.black};
  }

  select::-ms-expand {
    display: none;
  }

  .fieldset.select {
    width: 100%;
    border-bottom: 1px solid;
    border-radius: 0;
    padding: 0;
    margin: 0.5rem 0 1.5rem 0;
    ${props => props.theme.fluidType(0)};
    cursor: pointer;
    line-height: 1.1;
    background-color: transparent;
    grid-template-areas: "select";
    display: grid;
    align-items: center;
    max-width: 15rem;

    &:after {
      content: "";
      width: 0.8rem;
      height: 0.5rem;
      background-color: ${props => props.theme.colors.black};
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
      justify-self: end;
    }

    select,
    &:after {
      grid-area: select;
    }
  }

  .button,
  button,
  input[type="submit"],
  input[type="button"],
  input[type="reset"] {
    display: inline-block;
    cursor: pointer;
    padding: 0;

    font-family: inherit;
    font-size: 15px;
    text-decoration: none;
    white-space: nowrap;
    border: none;

    color: inherit;
    background-color: transparent;

    &:hover {
      text-decoration: none;
    }
  }

  .errorMsg {
    color: ${(props) => props.theme.colors.error};
  }
`

export default GlobalStyle
