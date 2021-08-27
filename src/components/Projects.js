import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import Fade from "react-reveal/Fade"
import styled from "styled-components"

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
              gatsbyImageData(placeholder: BLURRED)
              title
            }
          }
        }
      }
      allContentfulContentType(filter: { name: { eq: "Projects" } }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  const title = projectsData.allContentfulContentType.edges[0].node

  return (
    <>
      <Fade duration={1000} delay={50}>
        <ProjectsContainer id="projects">
          <ProjectPageTitle>{title.name}</ProjectPageTitle>
          {projectsData.allContentfulProjects.edges.map((item, index) => (
            <ProjectsContent node={item} key={index}>
              <ProjectWrapper>
                <ProjectColumnOne>
                  <ImageLink
                    href={item.node.projecUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Images
                      key={index}
                      image={item.node.projectImg.gatsbyImageData}
                      alt={item.node.projectImg.title}
                    />
                  </ImageLink>
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
            </ProjectsContent>
          ))}
        </ProjectsContainer>
      </Fade>
    </>
  )
}

export default Projects

const ProjectsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0rem 1rem;
  margin-top: 100px;

  @media screen and (max-width: 768px) {
    margin-top: 100px;
  }
`

const ProjectPageTitle = styled.div`
  font-size: clamp(1.5rem, 6vw, 2rem);
  font-weight: bold;
  padding: 2rem calc((100vw - 1100px) / 2);
  display: flex;
  align-self: flex-start;
  margin-left: 1rem;

  @media screen and (max-width: 768px) {
    padding: 1rem calc((100vw - 1100px) / 2);
  }
`

const ProjectsContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 400px;
  margin-bottom: 2rem;

  @media screen and (max-width: 768px) {
    justify-content: center;
    height: 500px;
    margin-bottom: 2rem;
  }
`

const ProjectWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0rem calc((100vw - 1100px) / 2);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const ProjectColumnOne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 1rem;
  width: 100%;
  justify-self: center;
  z-index: 1;

  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const ImageLink = styled.a`
  width: 100%;
  height: 100%;
  z-index: 2;

  &:hover {
    opacity: 50%;
  }
`

const Images = styled(GatsbyImage)`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 2%;
`

const ProjectColumnTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  margin-left: 1rem;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    justify-items: end;
  }
`
const ProjectH1 = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;

  @media screen and (max-width: 768px) {
    justify-self: left;
  }
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
    font-size: clamp(1rem, 5vw, 1rem);
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

  @media screen and (max-width: 950px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`
const RepositoryUrl = styled.a`
  font-size: 24px;
  margin-left: 1.5rem;

  @media screen and (max-width: 950px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`

const TechList = styled.p`
  display: flex;
  justify-content: flex-end;
  white-space: pre-wrap;
`
