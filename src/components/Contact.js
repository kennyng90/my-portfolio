import React from "react"
import ContactForm from "./ContactForm"
import styled from "styled-components"
import Fade from "react-reveal/Fade"

const Contact = () => {
  return (
    <Fade duration={1000} delay={100}>
      <Container>
        <ContactH1 id="contact">Get In Touch</ContactH1>
        <ContactP>Got a question or just want to say hi?</ContactP>
        <Wrapper>
          <Details>
            <ContactForm />
          </Details>
        </Wrapper>
      </Container>
    </Fade>
  )
}

export default Contact

export const Container = styled.div`
  width: 100%;
  margin: 4rem auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ContactH1 = styled.h1`
  width: 600px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 80%;
  }
`

const ContactP = styled.p`
  width: 600px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 80%;
  }
`

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

const Details = styled.div`
  flex: 1;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: unset;
    width: 80%;
    order: 1;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 26pt;
  }

  p {
    margin-bottom: 2.5rem;
    font-size: 20pt;
    font-weight: normal;
    line-height: 1.3;
  }
`
