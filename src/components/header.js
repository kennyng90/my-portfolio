import React  from "react"
import styled, { ThemeProvider } from "styled-components"
import { Link } from "gatsby"
import { useDarkMode } from "./useDarkMode"
import { GlobalStyles } from "./globalStyles"
import { lightTheme, darkTheme } from "./Themes"
import { menuData } from "../data/MenuData"
import { animateScroll as scroll } from "react-scroll";


import Toggle from "./Toggler"

const Header = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode()

  const themeMode = theme === "light" ? lightTheme : darkTheme
  
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  if (!mountedComponent) return <div />

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Nav>
          <NavLogo to="/" onClick={toggleHome}>
            Kenny N.
          </NavLogo>
          <NavMenu>
            {menuData.map((item, index) => (
              <NavLink to={item.link} key={index}>
                {item.title}
              </NavLink>
            ))}
          <Toggle theme={theme} toggleTheme={themeToggler} />
          </NavMenu>
        </Nav>
      </>
    </ThemeProvider>
  )
}

export default Header

const Nav = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1300px) / 2);
  z-index: 999;
  position: sticky;
  top: 0;
`

const NavLogo = styled(Link)`
  color:  ${({ theme }) => theme.text};
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
`

const NavLink = styled(Link)`
  color:  ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.2rem;
  height: 100%;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    height: 2px;
    width: 60%;

    background-color:  ${({ theme }) => theme.text};
    bottom: 10px;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    color: ${({ theme }) => theme.text};
    transition: 0.3s ease-out;
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`
const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
