import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }
  
  button {
    background: ${({ theme }) => theme.buttonBg};
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s ease;
    
    &:hover {
      background: ${({ theme }) => theme.accent};
    }
  }
`;
