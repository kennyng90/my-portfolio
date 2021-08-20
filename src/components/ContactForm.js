import React from "react"
import { Form, withFormik, FastField, ErrorMessage } from "formik"
import Recaptcha from "react-google-recaptcha"
import * as Yup from "yup"
import { recaptcha_key } from "../data/config"
import styled from "styled-components"

const ContactForm = ({
  setFieldValue,
  isSubmitting,
  values,
  errors,
  touched,
}) => (
  <Form
    name="Portfolio"
    method="post"
    data-netlify="true"
    data-netlify-recaptcha="true"
    data-netlify-honeypot="bot-field"
  >
    <InputField>
      <Input
        as={FastField}
        type="text"
        name="name"
        component="input"
        aria-label="name"
        placeholder="Full name*"
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
    {values.name && values.email && values.message && (
      <InputField>
        <FastField
          component={Recaptcha}
          sitekey={recaptcha_key}
          name="recaptcha"
          onChange={value => setFieldValue("recaptcha", value)}
        />
        <ErrorMessage component={Error} name="recaptcha" />
      </InputField>
    )}
    {values.success && (
      <InputField>
        <Center>
          <h4>
            Your message has been successfully sent, I will get back to you
            ASAP!
          </h4>
        </Center>
      </InputField>
    )}
    <Center>
      <Button secondary type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Center>
  </Form>
)

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    message: "",
    recaptcha: "",
    success: false,
  }),
  validationSchema: () =>
    Yup.object().shape({
      name: Yup.string().required("Full name field is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email field is required"),
      message: Yup.string().required("Message field is required"),
      recaptcha: Yup.string().required("Robots are not welcome yet!"),
    }),
  handleSubmit: async (
    { name, email, message, recaptcha },
    { setSubmitting, resetForm, setFieldValue }
  ) => {
    try {
      const encode = data => {
        return Object.keys(data)
          .map(
            key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          )
          .join("&")
      }
      await fetch("/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "Portfolio",
          name,
          email,
          message,
          "g-recaptcha-response": recaptcha,
        }),
      })
      await setSubmitting(false)
      await setFieldValue("success", true)
      setTimeout(() => resetForm(), 2000)
    } catch (err) {
      setSubmitting(false)
      setFieldValue("success", false)
      alert("Something went wrong, please try again!") // eslint-disable-line
    }
  },
})(ContactForm)

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #6c63ff;
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
  color: #fff;
  background: #0074d9;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
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
