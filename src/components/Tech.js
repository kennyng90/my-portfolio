import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SiReact, SiRedux, SiGraphql } from "react-icons/si"
import { FiFigma } from "react-icons/fi"
import styled from "styled-components"

const Tech = () => {
  const techData = useStaticQuery(graphql`
    query techQuery {
      allContentfulTech(sort: { fields: createdAt }) {
        edges {
          node {
            categoryTitle
            categoryList
            categoryImage {
              file {
                url
              }
              description
              svg {
                dataURI
              }
            }
          }
        }
      }
    }
  `)

  return (
    <TechContainer id="tech">
      <Heading>Technologies i've working with recently</Heading>
      <IconWrapper>
        <SiReact style={{ height: 40, width: 40 }} />
        <SiRedux style={{ height: 40, width: 40 }} />
        <FiFigma style={{ height: 40, width: 40 }} />
        <SiGraphql style={{ height: 40, width: 40 }} />
      </IconWrapper>

      <Wrapper>
        {techData.allContentfulTech.edges.map((item, index) => {
          return (
            <TechBox key={index}>
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
  )
}

export default Tech

const TechContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem calc((100vw - 1300px) / 2);
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
const IconWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 70px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    height: 100%;
    margin-top: 100px;
    grid-row-gap: 5px;
    padding: 2rem;
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 40px;
    grid-row-gap: 50px;
  }
`
const TechBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
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
