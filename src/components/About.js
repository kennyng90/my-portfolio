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
            description
          }
        }
      }
    }
    
  `)

  const image = aboutData.allContentfulPortfolio.nodes[0]

  const aboutContentful = aboutData.allContentfulPortfolio.nodes[0]

  return (
    <AboutContainer>
      <AboutH1>{aboutContentful.aboutTitle}</AboutH1>
      <AboutWrapper>
        <AboutColumnOne>
          <AboutDescription>
          {documentToReactComponents(
                JSON.parse(aboutContentful.aboutDesc.raw)
              )}
            </AboutDescription>
        </AboutColumnOne>
        <AboutColumnTwo>
            <Images
              image={image.profile.gatsbyImageData}
              alt={image.profile.description}
            />
        </AboutColumnTwo>
      </AboutWrapper>
    </AboutContainer>
  )
}

export default About

const AboutContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  position: relative;
`

const AboutH1 = styled.div`
  font-size: clamp(1.5rem, 6vw, 2rem);
  font-weight: bold;
  display: flex;
  align-self: flex-start;
  padding: 0rem calc((100vw - 1300px) / 2);
  margin: 0 1rem;
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
  max-width: 800px;
  width: 800px;
  padding: 0 1rem;
  border: 1px sold black;

  @media screen and (max-width: 1230px) {
    width: 100%;
  }
`

const AboutDescription = styled.div`
  font-size: clamp(1rem, 6vw, 1.5rem);
  letter-spacing: 3px;
  line-height: 1.8;
  margin-top: 5rem;
  white-space: pre-wrap;

  @media screen and (max-width: 768px) {
    font-size: clamp(1rem, 6vw, 1.3rem);
  }
`

const AboutColumnTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  justify-items: end;

  @media screen and (max-width: 1024px) {
    justify-items: center;
    margin-top: 4rem;
  }

  /* @media screen and (max-width: 768px) {
    width: 80%;
    align-self: center;
  } */
`

const Images = styled(GatsbyImage)`
  border-radius: 50%;
  transition: all 0.4s ease-out;

  &:hover {
    border-radius: 20%;
  }

`
