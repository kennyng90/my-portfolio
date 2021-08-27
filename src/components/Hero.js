import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Link as LinkS } from "react-scroll"
import Fade from "react-reveal/Fade"
import styled from "styled-components"

const Hero = () => {
  const heroData = useStaticQuery(graphql`
    query HeroQuery {
      allContentfulPortfolio {
        nodes {
          heroDescription {
            raw
          }
        }
      }
    }
  `)

  const heroContentful = heroData.allContentfulPortfolio.nodes[0]

  return (
    <>
      <Fade duration={1000} delay={50}>
        <HeroContainer>
          <HeroContent>
            <HeroItems>
              <HeroDesc>
                {documentToReactComponents(
                  JSON.parse(heroContentful.heroDescription.raw)
                )}
              </HeroDesc>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
              >
                Get In Touch
              </Link>
            </HeroItems>
          </HeroContent>
        </HeroContainer>
      </Fade>
    </>
  )
}

export default Hero

const HeroContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding: 0 1rem;
  position: relative;
  margin-top: -80px;

  @media screen and (max-width: 1024px) {
    height: 100vh;
  }
`
const HeroContent = styled.div`
  z-index: 3;
  max-height: 100%;
  padding: 0rem calc((100vw - 1100px) / 2);
`

const HeroItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  max-height: 100%;
  padding: 0;
  max-width: 800px;
`

const HeroDesc = styled.div`
  font-size: clamp(2.1rem, 6vw, 3rem);
  margin-top: -0.5rem;
  margin-bottom: 5rem;
  letter-spacing: 3px;
  line-height: 1.8;
  padding: 0 1rem;
  width: 700px;

  @media screen and (max-width: 768px) {
    margin-top: 4rem;
    line-height: 1.5;
    width: 90%;
  }

  @media screen and (max-width: 545px) {
    width: 85%;
  }

  @media screen and (max-width: 420px) {
    width: 80%;
  }
`
const Link = styled(LinkS)`
  text-align: center;
  padding: 1rem 2rem;
  width: 12rem;
  margin: 0 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  border-radius: 6px;
  border: 2px solid currentColor;

  &:hover {
    background-color: #2d3748;
    color: #f9fafb;
  }

  @media screen and (max-width: 700px) {
    font-size: 1rem;
    padding: 1rem 1rem;
    width: 8rem;
  }
`
