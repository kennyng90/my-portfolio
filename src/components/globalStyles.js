import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Cabin, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  a{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Cabin, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  a::after{
    background-color: ${({ theme }) => theme.text};
  }
  `
