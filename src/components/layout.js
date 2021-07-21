import * as React from "react"
import { useState } from "react"
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
    </>
  )
}

export default Layout
