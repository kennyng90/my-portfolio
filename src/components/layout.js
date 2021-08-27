import * as React from "react"
import { useState } from "react"
import About from "./About"
import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero"
import Projects from "./Projects"
import Contact from "./Contact"
import Tech from "./Tech"
import Seo from "./seo"

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Seo />
      <Header isOpen={isOpen} toggle={toggle} />
      <Hero />
      <About />
      <Tech />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default Layout
