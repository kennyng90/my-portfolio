import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      allContentfulHero {
        nodes {
          description {
            raw
          }
          title
          contact
          email
        }
      }
    }
  `)

  const heroContentful = data.allContentfulHero.nodes[0]

  return (
    <>
      <HeroContainer>
        <HeroContent>
          <HeroItems>
            <HeroTitle>{heroContentful.title}</HeroTitle>
            <HeroH1>
              {documentToReactComponents(
                JSON.parse(heroContentful.description.raw)
              )}
            </HeroH1>
            <ContactContainer>
              <HeroContact>{heroContentful.contact}</HeroContact>
              <HeroEmail href={"mailto:" + heroContentful.email} target="_blank" rel="noopener noreferrer">
                {heroContentful.email}
              </HeroEmail>
            </ContactContainer>
          </HeroItems>
        </HeroContent>
      </HeroContainer>
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
`
const HeroContent = styled.div`
  z-index: 3;
  height: calc(100vh - 80px);
  max-height: 100%;
  padding: 0rem calc((100vw - 1300px) / 2);
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

const HeroTitle = styled.div`
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  letter-spacing: 3px;
  line-height: 1.8;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    margin-bottom: 0rem;
    margin-top: 1.5rem;
  }
`

const HeroH1 = styled.div`
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  margin-top: 5rem;
  letter-spacing: 3px;
  line-height: 1.8;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    margin-top: 4rem;
  }
`

const ContactContainer = styled.div`
  display: flex;
  margin-top: 5rem;

  @media screen and (max-width: 768px) {
    margin-top: 4rem;
    flex-direction: column;
  }
`

const HeroContact = styled.div`
  font-size: clamp(1rem, 6vw, 1.2rem);
  letter-spacing: 3px;
  line-height: 1.8;
  padding: 0 1rem;
`

const HeroEmail = styled.a`
  font-size: clamp(1rem, 6vw, 1.2rem);
  letter-spacing: 3px;
  line-height: 1.8;
  position: relative;
  text-decoration: none;
  display: inline-block;

  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    transform: scaleX(0);
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${({ theme }) => theme.body};
    transform-origin: bottom right;
    transition-property: width;
    transition: transform 0.25s ease-out;

    @media screen and (max-width: 768px) {
      background-color: transparent;
  }
  }

  &:hover:after {
    color: ${({ theme }) => theme.text};
    transition: 0.3s ease-out;
    transform: scaleX(1);
    width: 100%;
    transform-origin: bottom left;
  }

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
    text-decoration: underline;

    &:hover{
      color:  ${({ theme }) => (theme ? "#7f7f7f" : "#293349")};
    }
  }
`
