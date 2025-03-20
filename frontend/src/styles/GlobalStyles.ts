// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: ${(props) => props.theme.primary};
    --background-color: ${(props) => props.theme.background};
    --text-color: ${(props) => props.theme.text};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all 0.3s ease-in-out;
  }
`;
