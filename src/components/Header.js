import React, { useState } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Link } from "gatsby"
import { useDarkMode } from "./useDarkMode"
import { GlobalStyles } from "./globalStyles"
import { lightTheme, darkTheme } from "./Themes"
import { menuData } from "../data/MenuData"
import { animateScroll as scroll } from "react-scroll"

import Toggle from "./Toggler"

const Header = ({ toggle, isOpen }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)

  const themeMode = theme === "light" ? lightTheme : darkTheme

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  if (!mountedComponent) return <div />

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Nav>
          <NavLogo to="/" onClick={toggleHome}>
            Kenny N
          </NavLogo>
          <NavMenu>
            {menuData.map((item, index) => (
              <NavLink to={item.link} key={index}>
                {item.title}
              </NavLink>
            ))}
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </NavMenu>

          <MobileIcon onClick={handleClick}>
            {click ? (
              <Close
                onClick={toggle}
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </Close>
            ) : (
              <Burger
                onClick={toggle}
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" />
              </Burger>
            )}
          </MobileIcon>
        </Nav>
        <SidebarView>
          <SidebarContainer isOpen={isOpen}>
            <SidebarWrapper>
              <SidebarMenu>
                {menuData.map((item, index) => (
                  <SidebarLinks to={item.link} key={index}>
                    {item.title}
                  </SidebarLinks>
                ))}
              <Toggle theme={theme} toggleTheme={themeToggler} />

              </SidebarMenu>
            </SidebarWrapper>
          </SidebarContainer>
        </SidebarView>
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
  color: ${({ theme }) => theme.text};
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
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  margin: 0 1.2rem;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);

    height: 2px;
    right: 0;
    width: 0;
    background-color: ${({ theme }) => theme.text};
    bottom: 15px;
    transform-origin: bottom right;
    transition-property: width;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    color: ${({ theme }) => theme.text};
    transition: 0.3s ease-out;
    transform: scaleX(1);
    transform-origin: bottom left;
    width: 100%;
  }
`
const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileIcon = styled.button`
  display: none;
  color: ${({ theme }) => theme.text};
  stroke: none;
  border: 0;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    background: transparent;
    top: 0;
    right: 0;
    transform: translate(-60%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`
const Close = styled.svg`
  color: ${({ theme }) => theme.text};
  height: auto;
  transition: opacity 0.3s ease;
  transform: scale(1);
`

const Burger = styled.svg`
  color: ${({ theme }) => theme.text};
  height: auto;
  transition: opacity 0.3s ease;
  transform: scale(1);
`

//Mobile menu

export const SidebarView = styled.aside`
  display: none;
  position: relative;
  overflow: hidden;
  top: 0;
  z-index: 998;

  @media screen and (max-width: 768px) {
    display: block;
  }
`
export const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.body};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  transition: 0.5s ease-in-out;
  left: ${({ isOpen }) => (isOpen ? "0%" : "100%")};
`

export const SidebarWrapper = styled.div`
  padding: 0 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const SidebarMenu = styled.ul`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SidebarLinks = styled(Link)`
  color: ${({ theme }) => theme.text};
  display: inline-block;
  font-size: 1.5rem;
  padding-bottom: 50px;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  text-decoration: none;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);

    height: 2px;
    right: 0;
    width: 0;
    background-color: ${({ theme }) => theme.text};
    bottom: 45px;
    transform-origin: bottom right;
    transition-property: width;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    color: ${({ theme }) => theme.text};
    transition: 0.3s ease-out;
    transform: scaleX(1);
    transform-origin: bottom left;
    width: 100%;
  }
`
