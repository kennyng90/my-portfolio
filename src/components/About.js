import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Fade from "react-reveal/Fade"
import styled from "styled-components"

const About = () => {
  const [mobile, setMobile] = useState(false)

  const mobileView = () => {
    if (window.innerWidth <= 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

  useEffect(() => {
    mobileView()
  }, [])

  if (typeof window !== "undefined") {
    window.addEventListener("resize", mobileView)
  }

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
    <Fade duration={1000} delay={50}>
      <AboutContainer id="about">
        <AboutH1>{aboutContentful.aboutTitle}</AboutH1>
        <AboutWrapper>
          {mobile ? (
            <>
              <AboutColumnTwo>
                <Images
                  image={image.profile.gatsbyImageData}
                  alt={image.profile.description}
                />
              </AboutColumnTwo>
              <AboutColumnOne>
                <AboutDescription>
                  {documentToReactComponents(
                    JSON.parse(aboutContentful.aboutDesc.raw)
                  )}
                </AboutDescription>
              </AboutColumnOne>
            </>
          ) : (
            <>
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
            </>
          )}
        </AboutWrapper>
      </AboutContainer>
    </Fade>
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
  padding: 0rem calc((100vw - 1100px) / 2);
  margin: 0 1rem;
  margin-top: 2rem;
`

const AboutWrapper = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0rem calc((100vw - 1100px) / 2);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const AboutColumnOne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 800px;
  width: 600px;
  padding: 0 1rem;
  border: 1px sold black;

  @media screen and (max-width: 1230px) {
    width: 100%;
  }
`

const AboutDescription = styled.div`
  font-size: clamp(1rem, 6vw, 1.2rem);
  letter-spacing: 3px;
  line-height: 1.8;
  margin-top: 3rem;
  white-space: pre-wrap;

  @media screen and (max-width: 768px) {
    font-size: clamp(1rem, 6vw, 1rem);
  }
`

const AboutColumnTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  justify-items: end;

  @media screen and (max-width: 768px) {
    justify-items: center;
    margin-top: 4rem;
    width: 80%;
    margin-left: 2rem;
  }
`

const Images = styled(GatsbyImage)`
  border-radius: 50%;
  transition: all 0.4s ease-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    border-radius: 2%;
  }
`
