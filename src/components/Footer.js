import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { animateScroll as scroll } from "react-scroll"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const Footer = () => {
  const footerData = useStaticQuery(graphql`
    query FooterQuery {
      allContentfulFooter {
        edges {
          node {
            github
            mail
            linkedIn
          }
        }
      }
    }
  `)

  const footerLinks = footerData.allContentfulFooter.edges[0].node

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  return (
    <FooterContainer>
      <FooterLogo to="/" onClick={toggleHome}>
        Kenny N
      </FooterLogo>
      <SocialIcons>
        <SocialLink
          href={footerLinks.github}
          target="blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <FaGithub />
        </SocialLink>
        <SocialLink
          href={`mailto:${footerLinks.mail}`}
          target="blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <MdEmail />
        </SocialLink>
        <SocialLink
          href={footerLinks.linkedIn}
          target="blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <FaLinkedin />
        </SocialLink>
      </SocialIcons>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  margin-top: 80px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1100px) / 2);

  @media screen and (max-width: 768px) {
  }
`

const FooterLogo = styled(Link)`
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
`

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
`
const SocialLink = styled.a`
  font-size: 24px;
  margin-left: 1.5rem;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`
