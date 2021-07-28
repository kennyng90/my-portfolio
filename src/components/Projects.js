import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

const Projects = () => {
  const projectsData = useStaticQuery(graphql`
    query ProjectQuery {
      allContentfulProjects {
        edges {
          node {
            name
            description
            projecUrl
            repositoryUrl
            techList
            projectImg {
              gatsbyImageData(placeholder: BLURRED, formats: JPG)
              title
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {projectsData.allContentfulProjects.edges.map((item, index) => (
        <ProjectContainer node={item} key={index}>
          <ProjectWrapper>
            <ProjectColumnOne>
              <Images
                key={index}
                image={item.node.projectImg.gatsbyImageData}
                alt={item.node.projectImg.title}
              />
            </ProjectColumnOne>
            <ProjectColumnTwo>
              <ProjectH1>{item.node.name}</ProjectH1>
              <ProjectDescription>
                {item.node.description}
              </ProjectDescription>
              <TechList>{item.node.techList}</TechList>
              <IconLinks>
                <RepositoryUrl
                  href={item.node.repositoryUrl}
                  target="blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <FaGithub />
                </RepositoryUrl>
                <ProjectUrl
                  href={item.node.projecUrl}
                  target="blank"
                  rel="noopener noreferrer"
                  aria-label="ExternalLink"
                >
                  <FaExternalLinkAlt />
                </ProjectUrl>
              </IconLinks>
            </ProjectColumnTwo>
          </ProjectWrapper>
        </ProjectContainer>
      ))}
    </>
  )
}

export default Projects

const ProjectContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 8rem 0;
  padding: 0 1rem;
`
const ProjectWrapper = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0rem calc((100vw - 1300px) / 2);

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`
const ProjectColumnOne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 600px;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    max-width: 360px;
    margin-bottom: 2rem;
  }
`
const Images = styled(GatsbyImage)``

const ProjectColumnTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    justify-items: start;
  }
`
const ProjectH1 = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
`
const ProjectDescription = styled.p`
  font-size: clamp(1rem, 5vw, 1.4rem);
  letter-spacing: 3px;
  line-height: 1.8;
  margin-bottom: 4rem;

  @media screen and (max-width: 768px) {
    line-height: 1.5;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`

export const IconLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 1.5rem;
`

const ProjectUrl = styled.a`
  font-size: 24px;
  margin-left: 1.5rem;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`
const RepositoryUrl = styled.a`
  font-size: 24px;
  margin-left: 1.5rem;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`

const TechList = styled.p`
  display: flex;
  justify-content: flex-end;
  white-space: pre-wrap;
`
