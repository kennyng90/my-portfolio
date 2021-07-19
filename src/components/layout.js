import * as React from "react"
import { useState } from "react"
import Header from "./Header"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header isOpen={isOpen} toggle={toggle} />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
