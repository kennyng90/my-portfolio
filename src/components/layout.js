import * as React from "react"
import { useState } from "react"
import About from "./About"
import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero"
import Projects from "./Projects"
import Contact from "./Contact"

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header isOpen={isOpen} toggle={toggle} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default Layout
