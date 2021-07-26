import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const About = () => {
  const aboutData = useStaticQuery(graphql`
    query aboutQuery {
      allContentfulPortfolio {
        nodes {
          aboutTitle
          aboutDesc {
            raw
          }
          profile {
            gatsbyImageData(placeholder: BLURRED, formats: JPG)
          }
        }
      }
    }
    
  `)

  const aboutContentful = aboutData.allContentfulPortfolio.nodes[0]

  return (
    <AboutContainer>
      <AboutWrapper>
        <AboutColumnOne>
          <AboutH1>{aboutContentful.aboutTitle}</AboutH1>
          <AboutDescription>
          {documentToReactComponents(
                JSON.parse(aboutContentful.aboutDesc.raw)
              )}
            </AboutDescription>
        </AboutColumnOne>
        <AboutColumnTwo>
          {aboutData.allContentfulPortfolio.nodes.map((image, key) => (
            <Images
              key={key}
              image={image.profile.gatsbyImageData}
              alt={image.profile.description}
            />
          ))}
        </AboutColumnTwo>
      </AboutWrapper>
    </AboutContainer>
  )
}

export default About

const AboutContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding: 0 1rem;
`

const AboutWrapper = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0rem calc((100vw - 1300px) / 2);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const AboutColumnOne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 800px;
  padding: 0 1rem;

  @media screen and (max-width: 1100px) {
    max-width: 550px;
  }

  @media screen and (max-width: 450px) {
    max-width: 360px;
  }

  @media screen and (max-width: 400px) {
    max-width: 320px;
  }
`

const AboutH1 = styled.div`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
`

const AboutDescription = styled.div`
  font-size: clamp(1rem, 5vw, 1.4rem);
  letter-spacing: 3px;
  line-height: 1.8;
  margin-top: 5rem;
  white-space: pre-wrap;

  @media screen and (max-width: 768px) {
    line-height: 1.5;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`

const AboutColumnTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: end;

  @media screen and (max-width: 768px) {
    justify-items: center;
  }
`

const Images = styled(GatsbyImage)`
  border-radius: 50%;
  transition: all 0.4s ease-out;

  &:hover {
    border-radius: 20%;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`
