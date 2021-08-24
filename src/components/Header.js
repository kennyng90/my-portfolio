import React, { useState, useEffect } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Link } from "gatsby"
import { useDarkMode } from "./useDarkMode"
import { GlobalStyles } from "./globalStyles"
import { lightTheme, darkTheme } from "./Themes"
import { menuData } from "../data/MenuData"
import { IoMdMenu, IoMdClose } from "react-icons/io"
import { Link as LinkS, animateScroll as scroll } from "react-scroll"

import Toggle from "./Toggler"

const Header = ({ toggle, isOpen }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const [click, setClick] = useState(false)
  const [scrollNav, setScrollNav] = useState(false)

  const handleClick = () => setClick(!click)

  const themeMode = theme === "light" ? lightTheme : darkTheme

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  const toggleFunc = () => {
    handleClick()
    toggle()
  }

  useEffect(() => {
    window.addEventListener("scroll", setScrollNav)
  }, [])

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
              <NavLink
                to={item.link}
                key={index}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-20}
                scrollNav={scrollNav}
              >
                {item.title}
              </NavLink>
            ))}
            <NavA href="resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </NavA>
            <Toggle theme={theme} toggleTheme={themeToggler} />
          </NavMenu>

          <MobileIcon>
            {click ? (
              <IoMdClose onClick={toggleFunc} />
            ) : (
              <IoMdMenu onClick={toggleFunc} />
            )}
          </MobileIcon>
        </Nav>
        <SidebarView>
          <SidebarContainer isOpen={isOpen}>
            <SidebarWrapper>
              <SidebarMenu>
                {menuData.map((item, index) => (
                  <SidebarLinks
                    to={item.link}
                    key={index}
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                    onClick={toggleFunc}
                  >
                    {item.title}
                  </SidebarLinks>
                ))}
                <SideA
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </SideA>
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
  overflow: hidden;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1300px) / 2);
  z-index: 999;
  position: relative;
  top: 0;

  @media screen and (max-width: 768px) {
    position: sticky;
    background-color: ${({ theme }) => theme.body};
  }
`

const NavLogo = styled(Link)`
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
`

const NavLink = styled(LinkS)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  margin: 0 1.2rem;
  background-color: transparent;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    height: 2px;
    width: 100%;

    bottom: 15px;
    left: 0;
    background-color: ${({ theme }) => theme.text};
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

const NavA = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  margin: 0 1.2rem;
  position: relative;
  background-color: transparent;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    height: 2px;
    width: 100%;

    bottom: 15px;
    left: 0;
    background-color: ${({ theme }) => theme.text};
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

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    stroke: none;
    border: 0;
    display: block;
    height: 30px;
    position: absolute;
    background: transparent;
    color: ${({ theme }) => theme.text};
    top: 0;
    right: 0;
    transform: translate(-60%, 80%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

//Mobile menu

const SidebarView = styled.aside`
  display: none;
  position: relative;
  overflow: hidden;
  top: 0;
  z-index: 998;

  @media screen and (max-width: 768px) {
    display: block;
  }
`
const SidebarContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  transition: 0.5s ease-in-out;
  left: ${({ isOpen }) => (isOpen ? "0%" : "100%")};
`

const SidebarWrapper = styled.div`
  padding: 0 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SidebarMenu = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 4rem;
`

const SidebarLinks = styled(LinkS)`
  color: ${({ theme }) => theme.text};
  display: inline-block;
  font-size: 1.2rem;
  padding-bottom: 50px;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  background-color: transparent;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    height: 2px;
    width: 100%;
    bottom: 40px;
    left: 0;
    background-color: ${({ theme }) => theme.text};

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

const SideA = styled.a`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  text-decoration: none;
  margin-bottom: 3.4rem;
  position: relative;
  cursor: pointer;
  background-color: transparent;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    height: 2px;
    width: 100%;

    bottom: -10px;
    left: 0;
    background-color: ${({ theme }) => theme.text};
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
