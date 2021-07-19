import React from "react"
import { ThemeProvider } from "styled-components"
import { useDarkMode } from "./useDarkMode"
import { GlobalStyles } from "./globalStyles"
import { lightTheme, darkTheme } from "./Themes"
import Toggle from "./Toggler"

const Header = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div
        >
          <h1>Hello</h1>
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
      </>
    </ThemeProvider>
  )
}

export default Header
