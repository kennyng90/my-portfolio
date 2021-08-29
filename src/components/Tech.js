import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SiReact, SiJavascript, SiGithub } from "react-icons/si"
import { FiFigma } from "react-icons/fi"
import Fade from "react-reveal/Fade"
import styled from "styled-components"

const Tech = () => {
  const techData = useStaticQuery(graphql`
    query techQuery {
      allContentfulTech(sort: { fields: createdAt }) {
        edges {
          node {
            categoryTitle
            categoryList
          }
        }
      }
    }
  `)

  return (
    <Fade duration={1000} delay={50}>
      <TechContainer id="tech">
        <Heading>Technologies I've Working With Recently</Heading>
        <Wrapper>
          {techData.allContentfulTech.edges.map((item, index) => {
            return (
              <TechBox key={index}>
                {item.node.categoryTitle === "Languages" && (
                  <SiJavascript
                    style={{ height: 40, width: 40, marginBottom: 20 }}
                  />
                )}
                {item.node.categoryTitle === "Frameworks & Libraries" && (
                  <SiReact
                    style={{ height: 40, width: 40, marginBottom: 20 }}
                  />
                )}
                {item.node.categoryTitle === "Design" && (
                  <FiFigma
                    style={{ height: 40, width: 40, marginBottom: 20 }}
                  />
                )}
                {item.node.categoryTitle === "Tools & Platforms" && (
                  <SiGithub
                    style={{ height: 40, width: 40, marginBottom: 20 }}
                  />
                )}
                <Title>{item.node.categoryTitle}</Title>
                <ListContainer>
                  <List>
                    {item.node.categoryList.map(str => {
                      return `
          ${str}
        `
                    })}
                  </List>
                </ListContainer>
              </TechBox>
            )
          })}
        </Wrapper>
      </TechContainer>
    </Fade>
  )
}

export default Tech

const TechContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem calc((100vw - 1100px) / 2);
  margin-top: 8rem;

  @media screen and (max-width: 1024px) {
    height: 60vh;
    margin-top: 4rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: 6rem;
    height: 100%;
  }
`

const Heading = styled.h1`
  text-align: start;
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: 2rem;
  padding: 0 2rem;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
const TechBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: clamp(1.2rem, 6vw, 1.4rem);
  margin-bottom: 0.5rem;

  @media screen and (max-width: 768px) {
    font-weight: bold;
  }
`

const ListContainer = styled.div``
const List = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  white-space: pre-line;
`
