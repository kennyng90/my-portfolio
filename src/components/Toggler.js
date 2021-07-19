import React from "react"
import { func, string } from "prop-types"
import styled from "styled-components"

const Button = styled.button`
  cursor: pointer;
  stroke: none;
  border: 0;
  margin: 0 1.5rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
`

const Sun = styled.svg`
  height: auto;
  transition: opacity 0.3s ease;
  transform: scale(1);
`

const Moon = styled.svg`
  height: auto;
  transition: opacity 0.3s ease;
  transform: scale(1);
`
const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </Moon>
      ) : (
        <Sun
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </Sun>
      )}
    </Button>
  )
}

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle
