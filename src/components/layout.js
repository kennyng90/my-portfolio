import * as React from "react"
import { useState } from "react"
import About from "./About"
import Header from "./Header"
import Hero from "./Hero"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header isOpen={isOpen} toggle={toggle} />
      <Hero />
      <About />
    </>
  )
}

export default Layout
