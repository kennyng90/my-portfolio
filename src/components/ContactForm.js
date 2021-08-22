import React from "react"
import { Form, Formik, FastField, ErrorMessage } from "formik"
import Recaptcha from "react-google-recaptcha"
import * as Yup from "yup"
import styled from "styled-components"
import { url } from "../data/config"
import axios from "axios"

const ContactForm = () => (
  <Formik
    initialValues={{
      name: "",
      email: "",
      message: "",
      recaptcha: "",
      success: false,
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required("Name field is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email field is required"),
      message: Yup.string().required("Message field is required"),
      recaptcha:
        process.env.NODE_ENV !== "development"
          ? Yup.string().required("Robots are not welcome yet!")
          : Yup.string(),
    })}
    onSubmit={async (
      { name, email, message },
      { setSubmitting, resetForm, setFieldValue }
    ) => {
      try {
        await axios({
          method: "POST",
          url:
            process.env.NODE_ENV !== "development"
              ? `${url}/api/contact`
              : "http://localhost:3000/api/contact",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            name,
            email,
            message,
          }),
        })
        setSubmitting(false)
        setFieldValue("success", true)
        setTimeout(() => resetForm(), 6000)
      } catch (err) {
        setSubmitting(false)
        setFieldValue("success", false)
        alert("Something went wrong, please try again!")
      }
    }}
  >
    {({ values, touched, errors, setFieldValue, isSubmitting }) => (
      <Form>
        <InputField>
          <Input
            as={FastField}
            type="text"
            name="name"
            component="input"
            aria-label="name"
            placeholder="Name*"
            error={touched.name && errors.name}
          />
          <ErrorMessage component={Error} name="name" />
        </InputField>
        <InputField>
          <Input
            id="email"
            aria-label="email"
            component="input"
            as={FastField}
            type="email"
            name="email"
            placeholder="Email*"
            error={touched.email && errors.email}
          />
          <ErrorMessage component={Error} name="email" />
        </InputField>
        <InputField>
          <Input
            as={FastField}
            component="textarea"
            aria-label="message"
            id="message"
            rows="8"
            type="text"
            name="message"
            placeholder="Message*"
            error={touched.message && errors.message}
          />
          <ErrorMessage component={Error} name="message" />
        </InputField>
        {values.name &&
          values.email &&
          values.message &&
          process.env.NODE_ENV !== "development" && (
            <InputField>
              <FastField
                component={Recaptcha}
                sitekey={process.env.GATSBY_PORTFOLIO_RECAPTCHA_KEY}
                name="recaptcha"
                onChange={value => setFieldValue("recaptcha", value)}
              />
              <ErrorMessage component={Error} name="recaptcha" />
            </InputField>
          )}
        {values.success && (
          <InputField>
            <Center>
              <h4>Your message has been successfully sent</h4>
            </Center>
          </InputField>
        )}
        <Center>
          <Button secondary type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Center>
      </Form>
    )}
  </Formik>
)

export default ContactForm

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #111827;
  padding: 0.8rem 1rem;
  border-radius: 7px;
  margin-bottom: 0.5rem;
  transition: 0.3s;

  ${({ error }) =>
    error &&
    `
		border-color: #ff4136;
	`}

  &::placeholder {
    color: #a7a7a7;
  }
`

export const Button = styled.button`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2.5rem;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
`

export const Error = styled.span`
  color: #ff4136;
`

export const Center = styled.div`
  text-align: left;

  h4 {
    font-weight: normal;
  }
`

export const InputField = styled.div`
  position: relative;
  margin-bottom: 1rem;
`
