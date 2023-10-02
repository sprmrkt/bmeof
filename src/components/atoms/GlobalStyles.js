import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

  .snipcart-cart-button--highlight, .snipcart__box--badge-highlight {
    background-image: none !important;
    background: black !important;
  }

  .snipcart-cart-button {
    background: black !important;
  }

  .snipcart__actions--link {
    color: black !important;
  }

  .snipcart__icon--blue-dark path {
    fill: black !important;
  }

  .snipcart__icon--blue-light path {
    fill: black !important;
  }


  :root {
    --windowHeight: 100vh;
    --horizontalHoverDistance: 0px;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${props => props.theme.fluidType(0)};
    overscroll-behavior-y: none;

    * { box-sizing: border-box; }
  }

  body {
    margin: 0;
    // Use system fonts: https://css-tricks.com/snippets/css/system-font-stack/
    font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    overscroll-behavior-y: none;
    overflow: hidden;
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
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    font-weight: normal;

    a { text-decoration: none; }

    a:hover { text-decoration: none; }
  }

  h1, .h1, .h1.button {
    font-size: 33.5vw;
    font-kerning: normal;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    line-height: 0.75;
    width: 100%;
    text-align: left;
    white-space: normal;
    margin: 0;

    .letter {
      transform: translateY(-3%);
    }

    @-moz-document url-prefix() {
      .letter {
        transform: translateY(8%);
      }
    }
  }

  h2, .h2,
  h3, .h3,
  h4, .h4,
  h5, .h5,
  h6, .h6, .p, p, li {
    font-size: 13px;
    line-height: 14px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 15px;
      line-height: 16px;
    }
  }

  .p-large p, p.large {
    font-size: 13px;
    line-height: 14px;
    margin-bottom: 0.75em;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 40px;
      line-height: 36px;
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


  }

  sup, sub {
    vertical-align: baseline;
    position: relative;
    top: -0.4em;
  }

  sub { top: 0.4em; }

  label {
    ${props => props.theme.fluidType(-1)};
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
    ${props => props.theme.fluidType(0)};
    padding: 0.2rem 0.5rem;
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid;
    border-radius: 2px;
    line-height: 1.6;
    background-color: transparent;
    -webkit-appearance: none;

    &:focus {
      border: 1px ${props => props.theme.colors.focus} solid;
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
    text-decoration: none;
    white-space: nowrap;
    border: none;

    color: inherit;
    background-color: transparent;
    margin: 0;

    font-size: 13px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 15px;
    }

    &:hover {
      text-decoration: none;
    }
  }

  .errorMsg {
    color: ${props => props.theme.colors.error};
  }

  .is-affected-by-horizontal-hover {
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

    &.horizontal-hover-is-on {
      transition: transform 1.5s cubic-bezier(.15, 1.03, .72, .94);
      @media ( ${props => props.theme.breakpoints.md} ) {
        transform: translateX(calc((var(--horizontalHoverDistance) + 24px) * -1));
      }
    }
  }

  .manual-kerning {
    display: flex;

    .letter-w + .letter-o {
      margin-left: -1.5vw;
    }

    .letter-o + .letter-r {
      margin-left: -0.25vw;
    }

    .letter-a + .letter-g {
      margin-left: -2.2vw;
    }

    .letter-d + .letter-i {
      margin-left: -0.5vw;
    }

    .letter-i + .letter-o {
      margin-left: -0.5vw;
    }

    .letter-b + .letter-e {
      margin-left: -0.5vw;
    }

    .letter-m + .letter-e {
      margin-left: -0.75vw;
    }

    .letter-e + .letter-e {
      margin-left: -0.5vw;
    }

    .letter-r + .letter-a {
      margin-left: 1.5vw;
    }

    .letter-a + .letter-v {
      margin-left: -5.5vw;
    }

    .letter-v + .letter-y {
      margin-left: 1.2vw;
    }
  }
`;

export default GlobalStyle;

