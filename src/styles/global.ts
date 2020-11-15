import { createGlobalStyle } from "styled-components";

export default createGlobalStyle
  `
  *{
    padding: 0;
    margin: 0;
    box-sizin: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font: 400 1rem Roboto, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
