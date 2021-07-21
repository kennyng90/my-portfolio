import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      allContentfulHero {
        nodes {
          description {
            raw
          }
        }
      }
    }
  `)

  const firstRichContent = data.allContentfulHero.nodes[0]

  return (
    <>
      <HeroContainer>
        <HeroContent>
          <HeroItems>
              <HeroH1>{documentToReactComponents(JSON.parse(firstRichContent.description.raw))}</HeroH1>
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
  align-items: center;
  height: 100vh;
  max-height: 100%;
  padding: 0;
  line-height: 1.1;
`

const HeroH1 = styled.div`
  font-size: clamp(1.5rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  letter-spacing: 3px;
  padding: 0 1rem;
`